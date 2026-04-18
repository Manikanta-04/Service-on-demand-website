import { Router } from 'express';
import { getSlots } from '../controllers/slot.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware(['user', 'worker', 'admin']), getSlots);

export default router;
