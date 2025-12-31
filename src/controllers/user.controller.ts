import { Request, Response } from 'express';
import { asyncHandler } from '@utils';
import { userService } from '@services';
import { ResponseUtil } from '@utils';
import { AuthRequest } from '@middlewares';

export class UserController {
  private static instance: UserController;

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const result = await userService.signup(req.body);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.created(res, result.data, result.messageKey!);
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const { username, password } = req.body;
    const result = await userService.login(username, password);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const userId = req.user!.userId;
    const result = await userService.getUserById(userId);

    if (!result.success) {
      ResponseUtil.notFound(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });

  updateProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    const userId = req.user!.userId;
    const result = await userService.updateUser(userId, req.body);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });
}

export const userController = UserController.getInstance();
