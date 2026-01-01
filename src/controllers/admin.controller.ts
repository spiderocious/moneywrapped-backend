import { Response } from 'express';
import { asyncHandler, ResponseUtil } from '@utils';
import { adminService } from '@services';
import { MESSAGE_KEYS } from '@shared/constants';
import { AuthRequest } from '@middlewares';

export class AdminController {
  private static instance: AdminController;

  public static getInstance(): AdminController {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController();
    }
    return AdminController.instance;
  }

  listUsers = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await adminService.listUsers(page, limit);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  getUserDetail = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const { userId } = req.params;

    if (!userId) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.INVALID_REQUEST);
      return;
    }

    const result = await adminService.getUserDetail(userId);

    if (!result.success) {
      if (result.messageKey === MESSAGE_KEYS.USER_NOT_FOUND) {
        ResponseUtil.notFound(res, result.messageKey);
        return;
      }
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  addBonusQuota = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const { userId } = req.params;
    const { bonusToAdd } = req.body;

    if (!userId || !bonusToAdd) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.INVALID_REQUEST);
      return;
    }

    const result = await adminService.addBonusQuota(userId, bonusToAdd);

    if (!result.success) {
      if (result.messageKey === MESSAGE_KEYS.USER_NOT_FOUND) {
        ResponseUtil.notFound(res, result.messageKey);
        return;
      }
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  updateUserTier = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const { userId } = req.params;
    const { tier } = req.body;

    if (!userId || !tier) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.INVALID_REQUEST);
      return;
    }

    if (!['free', 'pro', 'enterprise'].includes(tier)) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.INVALID_REQUEST);
      return;
    }

    const result = await adminService.updateUserTier(userId, tier);

    if (!result.success) {
      if (result.messageKey === MESSAGE_KEYS.USER_NOT_FOUND) {
        ResponseUtil.notFound(res, result.messageKey);
        return;
      }
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });
}

export const adminController = AdminController.getInstance();
