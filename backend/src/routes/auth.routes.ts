import { Router } from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware(['user', 'worker', 'admin']), getMe);

export default router;
