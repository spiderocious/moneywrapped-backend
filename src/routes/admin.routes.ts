import { Router } from 'express';
import { adminController } from '@controllers';
import { authenticate, authorize } from '@middlewares';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// GET /api/admin/users - List all users with pagination
router.get('/users', adminController.listUsers);

// GET /api/admin/users/:userId - Get user details
router.get('/users/:userId', adminController.getUserDetail);

// PATCH /api/admin/users/:userId/quota - Add bonus quota to user
router.patch('/users/:userId/quota', adminController.addBonusQuota);

// PATCH /api/admin/users/:userId/tier - Update user tier
router.patch('/users/:userId/tier', adminController.updateUserTier);

export default router;
