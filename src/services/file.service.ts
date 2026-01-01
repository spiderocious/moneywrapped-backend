import { FileModel } from '@models';
import { ServiceResult, ServiceSuccess, ServiceError, FileContentResponse } from '@shared/types';
import { MESSAGE_KEYS } from '@shared/constants';
import { logger, generateId } from '@utils';
// @ts-ignore - pdf-parse types issue
import { PDFParse } from 'pdf-parse';
import { PdfData } from 'pdfdataextract';
// @ts-ignore - csv-parser has no types
import csv from 'csv-parser';
import { Readable } from 'stream';

export class FileService {
  private static instance: FileService;

  private constructor() {}

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService();
    }
    return FileService.instance;
  }

  async processFile(
    file: Express.Multer.File
  ): Promise<ServiceResult<FileContentResponse>> {
    try {
      const fileType = this.getFileType(file.originalname);

      if (!fileType) {
        return new ServiceError(
          'Unsupported file type. Only CSV, TXT, and PDF files are allowed',
          MESSAGE_KEYS.INVALID_FILE_TYPE
        );
      }

      let content: string;

      switch (fileType) {
        case 'pdf':
          content = await this.extractPdfContent(file.buffer);
          break;
        case 'csv':
          content = await this.extractCsvContent(file.buffer);
          break;
        case 'txt':
          content = this.extractTxtContent(file.buffer);
          break;
        default:
          return new ServiceError(
            'Unsupported file type',
            MESSAGE_KEYS.INVALID_FILE_TYPE
          );
      }

      await FileModel.create({
        id: generateId(16, 'FIL'),
        fileName: file.originalname,
        fileType: fileType,
        fileSize: file.size,
        processedAt: new Date(),
      });

      logger.info(`File processed: ${file.originalname} (${fileType}, ${file.size} bytes)`);

      return new ServiceSuccess(
        { content },
        MESSAGE_KEYS.FILE_PROCESSED_SUCCESS
      );
    } catch (error: any) {
      logger.error('File processing error', error);
      return new ServiceError(error.message, MESSAGE_KEYS.FILE_PROCESSING_FAILED);
    }
  }

  private getFileType(filename: string): 'csv' | 'txt' | 'pdf' | null {
    const extension = filename.split('.').pop()?.toLowerCase();

    if (extension === 'csv') return 'csv';
    if (extension === 'txt') return 'txt';
    if (extension === 'pdf') return 'pdf';

    return null;
  }

  private async extractPdfContent(buffer: Buffer): Promise<string> {
    try {
      // Pass the buffer directly - no readFileSync needed
      const data = await PdfData.extract(buffer);
      console.log(data);
      const text = data.text;
      if (!text) {
        return '';
      }
      return Array.isArray(text) ? text.join(' ') : String(text);
    } catch (error: any) {
      logger.error('PDF extraction error', error);
      throw new Error('Failed to extract PDF content');
    }
  }

  private async extractCsvContent(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const results: string[] = [];
      const stream = Readable.from(buffer);

      stream
        .pipe(csv())
        .on('data', (data: any) => {
          const row = Object.values(data).join(' ');
          results.push(row);
        })
        .on('end', () => {
          resolve(results.join(' '));
        })
        .on('error', (error) => {
          logger.error('CSV extraction error', error);
          reject(new Error('Failed to extract CSV content'));
        });
    });
  }

  private extractTxtContent(buffer: Buffer): string {
    return buffer.toString('utf-8');
  }
}

export const fileService = FileService.getInstance();
