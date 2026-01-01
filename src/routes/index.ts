import { Router } from 'express';
import userRoutes from './user.routes';
import healthRoutes from './health.routes';
import fileRoutes from './file.routes';
import analysisRoutes from './analysis.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/users', userRoutes);
router.use('/v1/files', fileRoutes);
router.use('/v1/monied', analysisRoutes);
router.use('/admin', adminRoutes);

export default router;
