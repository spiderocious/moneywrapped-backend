import { AnalysisJobModel, UserModel } from '@models';
import { fileService } from './file.service';
import { openAIService } from './openai.service';
import {
  ServiceResult,
  ServiceSuccess,
  ServiceError,
  IAnalysisMetadata,
  AnalysisJobListResponse,
  AnalysisJobDetailResponse,
} from '@shared/types';
import { MESSAGE_KEYS } from '@shared/constants';
import { logger, generateId } from '@utils';
import { aiConfig } from '@configs';

export class AnalysisService {
  private static instance: AnalysisService;

  private constructor() {}

  public static getInstance(): AnalysisService {
    if (!AnalysisService.instance) {
      AnalysisService.instance = new AnalysisService();
    }
    return AnalysisService.instance;
  }

  private generateAnalysisCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async createAnalysisJob(
    file: Express.Multer.File,
    userId: string
  ): Promise<ServiceResult<{ code: string; status: string }>> {
    try {
      // Check user quota
      const user = await UserModel.findOne({ id: userId });

      if (!user) {
        return new ServiceError('User not found', MESSAGE_KEYS.USER_NOT_FOUND);
      }

      const { limit, bonus, used } = user.analysisQuota;
      const totalAllowed = limit + bonus;

      // Check if quota exceeded (unlimited = -1)
      if (limit !== -1 && used >= totalAllowed) {
        logger.warn(`User ${userId} exceeded quota: ${used}/${totalAllowed}`);
        return new ServiceError(
          `Analysis quota exceeded. You have used ${used} of ${totalAllowed} analyses.`,
          MESSAGE_KEYS.QUOTA_EXCEEDED
        );
      }

      // Increment quota immediately (prevents race conditions)
      await UserModel.findOneAndUpdate(
        { id: userId },
        { $inc: { 'analysisQuota.used': 1 } }
      );

      logger.info(`User ${userId} quota incremented: ${used + 1}/${totalAllowed}`);

      // Generate unique code
      let code = this.generateAnalysisCode();
      let existing = await AnalysisJobModel.findOne({ code });

      // Ensure uniqueness
      while (existing) {
        code = this.generateAnalysisCode();
        existing = await AnalysisJobModel.findOne({ code });
      }

      // Create job record
      const job = await AnalysisJobModel.create({
        id: generateId(16, 'ANA'),
        code,
        userId,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: this.getFileType(file.originalname),
        status: 'pending',
        uploadedAt: new Date(),
      });

      logger.info(`Analysis job created: ${code} for user ${userId}`);

      // Start background processing (fire and forget)
      this.processAnalysis(job.id, file, userId).catch((error) => {
        logger.error(`Background analysis failed for job ${code}`, error);
      });

      return new ServiceSuccess({ code, status: 'pending' }, MESSAGE_KEYS.ANALYSIS_JOB_CREATED);
    } catch (error: any) {
      logger.error('Failed to create analysis job', error);
      return new ServiceError(error.message, MESSAGE_KEYS.ANALYSIS_JOB_CREATION_FAILED);
    }
  }

  private async processAnalysis(jobId: string, file: Express.Multer.File, userId: string): Promise<void> {
    try {
      logger.info(`Starting background analysis for job ${jobId}`);

      // Set timeout for OpenAI call (10 minutes)
      const timeout = 10 * 60 * 1000; // 10 minutes
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Analysis timed out after 10 minutes')), timeout)
      );

      let analysisPromise;

      // Choose analysis method based on config
      if (aiConfig.useBase64Upload) {
        logger.info(`Using base64 file upload for analysis (job ${jobId})`);
        analysisPromise = openAIService.analyzeFileStatement(file.buffer, file.originalname);
      } else {
        logger.info(`Using text extraction for analysis (job ${jobId})`);
        // Extract file content
        const fileResult = await fileService.processFile(file);

        if (!fileResult.success || !fileResult.data) {
          await this.refundQuota(userId);
          await AnalysisJobModel.findOneAndUpdate(
            { id: jobId },
            {
              status: 'failed',
              errorMessage: 'Failed to extract file content',
              completedAt: new Date(),
            }
          );
          return;
        }

        const fileContent = fileResult.data.content;
        analysisPromise = openAIService.analyzeStatement(fileContent);
      }

      // Race between analysis and timeout
      const result = await Promise.race([analysisPromise, timeoutPromise]);

      if (!result.success) {
        await this.refundQuota(userId);
        await AnalysisJobModel.findOneAndUpdate(
          { id: jobId },
          {
            status: 'failed',
            errorMessage: result.error || 'Analysis failed',
            completedAt: new Date(),
          }
        );
        return;
      }

      // Extract metadata from analysis result
      const metadata: IAnalysisMetadata | undefined = result.data?.analysis_metadata
        ? {
            statement_bank: result.data.analysis_metadata.statement_bank,
            period_start: result.data.analysis_metadata.period_start,
            period_end: result.data.analysis_metadata.period_end,
            account_type: result.data.analysis_metadata.account_type,
          }
        : undefined;

      // Update job with success
      await AnalysisJobModel.findOneAndUpdate(
        { id: jobId },
        {
          status: 'success',
          analysisResult: result.data,
          metadata,
          completedAt: new Date(),
        }
      );

      logger.info(`Analysis completed successfully for job ${jobId}`);
    } catch (error: any) {
      logger.error(`Background analysis error for job ${jobId}`, error);

      await this.refundQuota(userId);
      await AnalysisJobModel.findOneAndUpdate(
        { id: jobId },
        {
          status: 'failed',
          errorMessage: error.message || 'Unexpected error during analysis',
          completedAt: new Date(),
        }
      );
    }
  }

  private async refundQuota(userId: string): Promise<void> {
    try {
      await UserModel.findOneAndUpdate(
        { id: userId },
        { $inc: { 'analysisQuota.used': -1 } }
      );
      logger.info(`Refunded quota for user ${userId}`);
    } catch (error: any) {
      logger.error(`Failed to refund quota for user ${userId}`, error);
    }
  }

  async listUserAnalyses(userId: string): Promise<ServiceResult<AnalysisJobListResponse[]>> {
    try {
      const jobs = await AnalysisJobModel.find({ userId })
        .select('code status fileName fileSize fileType uploadedAt completedAt metadata')
        .sort({ uploadedAt: -1 })
        .lean();

      const analyses: AnalysisJobListResponse[] = jobs.map((job) => ({
        code: job.code,
        status: job.status,
        fileName: job.fileName,
        fileSize: job.fileSize,
        fileType: job.fileType,
        uploadedAt: job.uploadedAt,
        completedAt: job.completedAt,
        metadata: job.metadata,
      }));

      return new ServiceSuccess(analyses, MESSAGE_KEYS.ANALYSES_FETCHED);
    } catch (error: any) {
      logger.error('Failed to list analyses', error);
      return new ServiceError(error.message, MESSAGE_KEYS.ANALYSES_FETCH_FAILED);
    }
  }

  async getAnalysisDetail(
    code: string,
    userId: string
  ): Promise<ServiceResult<AnalysisJobDetailResponse>> {
    try {
      const job = await AnalysisJobModel.findOne({ code, userId }).lean();

      if (!job) {
        return new ServiceError('Analysis not found', MESSAGE_KEYS.ANALYSIS_NOT_FOUND);
      }

      const detail: AnalysisJobDetailResponse = {
        code: job.code,
        status: job.status,
        fileName: job.fileName,
        fileSize: job.fileSize,
        fileType: job.fileType,
        uploadedAt: job.uploadedAt,
        completedAt: job.completedAt,
        metadata: job.metadata,
        analysisResult: job.analysisResult,
        errorMessage: job.errorMessage,
      };

      return new ServiceSuccess(detail, MESSAGE_KEYS.ANALYSIS_FETCHED);
    } catch (error: any) {
      logger.error('Failed to get analysis detail', error);
      return new ServiceError(error.message, MESSAGE_KEYS.ANALYSIS_FETCH_FAILED);
    }
  }

  async markPendingJobsAsFailed(): Promise<void> {
    try {
      const result = await AnalysisJobModel.updateMany(
        { status: 'pending' },
        {
          status: 'failed',
          errorMessage: 'Server restarted during processing',
          completedAt: new Date(),
        }
      );

      if (result.modifiedCount > 0) {
        logger.info(`Marked ${result.modifiedCount} pending jobs as failed on server restart`);
      }
    } catch (error: any) {
      logger.error('Failed to mark pending jobs as failed', error);
    }
  }

  private getFileType(filename: string): 'csv' | 'txt' | 'pdf' {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension === 'csv') return 'csv';
    if (extension === 'txt') return 'txt';
    return 'pdf';
  }
}

export const analysisService = AnalysisService.getInstance();
