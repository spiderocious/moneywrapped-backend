import { Router } from 'express';
import { userController } from '@controllers';
import { signupValidation, loginValidation, updateProfileValidation } from '@requests';
import { validateRequest, authRateLimiter, authenticate } from '@middlewares';

const router = Router();

router.post(
  '/signup',
  authRateLimiter,
  signupValidation,
  validateRequest,
  userController.signup.bind(userController)
);

router.post(
  '/login',
  authRateLimiter,
  loginValidation,
  validateRequest,
  userController.login.bind(userController)
);

router.get('/profile', authenticate, userController.getProfile.bind(userController));

router.patch(
  '/profile',
  authenticate,
  updateProfileValidation,
  validateRequest,
  userController.updateProfile.bind(userController)
);

export default router;
