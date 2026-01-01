import { Request, Response } from 'express';
import { asyncHandler } from '@utils';
import { fileService } from '@services';
import { ResponseUtil } from '@utils';
import { MESSAGE_KEYS } from '@shared/constants';

export class FileController {
  private static instance: FileController;

  public static getInstance(): FileController {
    if (!FileController.instance) {
      FileController.instance = new FileController();
    }
    return FileController.instance;
  }

  extractContent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lang = ResponseUtil.extractLanguage(req);
    ResponseUtil.setLanguage(lang);

    if (!req.file) {
      ResponseUtil.badRequest(res, MESSAGE_KEYS.FILE_REQUIRED);
      return;
    }

    const result = await fileService.processFile(req.file);

    if (!result.success) {
      ResponseUtil.badRequest(res, result.messageKey!);
      return;
    }

    ResponseUtil.success(res, result.data, result.messageKey!);
  });
}

export const fileController = FileController.getInstance();
