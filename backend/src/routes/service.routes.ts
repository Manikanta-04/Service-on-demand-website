import { Router } from 'express';
import { getServices } from '../controllers/service.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware(['user', 'worker', 'admin']), getServices);

export default router;
