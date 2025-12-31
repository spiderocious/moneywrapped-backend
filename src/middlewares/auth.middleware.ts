import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '@utils';
import { ResponseUtil } from '@utils';
import { MESSAGE_KEYS } from '@shared/constants';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.TOKEN_REQUIRED);
      return;
    }

    const decoded = JWTUtil.verifyToken<{ userId: string; role: string }>(token);

    if (!decoded) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.INVALID_TOKEN);
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    ResponseUtil.unauthorized(res, MESSAGE_KEYS.INVALID_TOKEN);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ResponseUtil.unauthorized(res, MESSAGE_KEYS.UNAUTHORIZED);
      return;
    }

    if (!roles.includes(req.user.role)) {
      ResponseUtil.forbidden(res, MESSAGE_KEYS.FORBIDDEN);
      return;
    }

    next();
  };
};
