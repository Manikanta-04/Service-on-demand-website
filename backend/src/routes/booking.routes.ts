import { Router } from 'express';
import { lockSlot, releaseSlot, createBookingOrder, confirmPaymentWebhook, getMyBookings, getAllBookings } from '../controllers/booking.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware(['user']), getMyBookings);
router.get('/all', authMiddleware(['admin']), getAllBookings);
router.post('/lock-slot', authMiddleware(['user']), lockSlot);
router.post('/release-slot', authMiddleware(['user']), releaseSlot);
router.post('/create-order', authMiddleware(['user']), createBookingOrder);
router.post('/webhook', confirmPaymentWebhook);

export default router;
