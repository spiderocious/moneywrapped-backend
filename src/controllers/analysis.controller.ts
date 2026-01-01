import { Response } from 'express';
import { asyncHandler, ResponseUtil } from '@utils';
import { analysisService } from '@services';
import { MESSAGE_KEYS } from '@shared/constants';
import { AuthRequest } from '@middlewares';

export class AnalysisController {
  private static instance: AnalysisController;

  public static getInstance(): AnalysisController {
    if (!AnalysisController.instance) {
      AnalysisController.instance = new AnalysisController();
    }
    return AnalysisController.instance;
  }

  analyze = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    if (!req.file) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.FILE_REQUIRED);
      return;
    }

    if (!req.user?.userId) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.UNAUTHORIZED);
      return;
    }

    const result = await analysisService.createAnalysisJob(req.file, req.user.userId);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  listAnalyses = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    if (!req.user?.userId) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.UNAUTHORIZED);
      return;
    }

    const result = await analysisService.listUserAnalyses(req.user.userId);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  getAnalysisDetail = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    if (!req.user?.userId) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.UNAUTHORIZED);
      return;
    }

    const { code } = req.params;

    if (!code) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.INVALID_REQUEST);
      return;
    }

    const result = await analysisService.getAnalysisDetail(code, req.user.userId);

    if (!result.success) {
      if (result.messageKey === MESSAGE_KEYS.ANALYSIS_NOT_FOUND) {
        ResponseUtil.notFound(res, result.messageKey);
        return;
      }
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });
}

export const analysisController = AnalysisController.getInstance();
