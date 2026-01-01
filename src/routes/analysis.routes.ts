import { Router } from 'express';
import { analysisController } from '@controllers';
import { authenticate } from '@middlewares';
import { upload } from '@middlewares';

const router = Router();

// POST /api/v1/monied/analyze - Upload and analyze bank statement
router.post('/analyze', authenticate, upload.single('file'), analysisController.analyze);

// GET /api/v1/monied/tracks - List all user's analyses
router.get('/tracks', authenticate, analysisController.listAnalyses);

// GET /api/v1/monied/tracks/:code - Get specific analysis detail
router.get('/tracks/:code', authenticate, analysisController.getAnalysisDetail);

export default router;
