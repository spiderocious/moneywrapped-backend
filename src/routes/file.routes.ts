import { Router } from 'express';
import { fileController } from '@controllers';
import { upload } from '@middlewares';

const router = Router();

router.post(
  '/contents',
  upload.single('file'),
  fileController.extractContent.bind(fileController)
);

export default router;
