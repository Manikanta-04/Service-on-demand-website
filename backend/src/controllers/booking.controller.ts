import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Payment from '../models/Payment';
import Service from '../models/Service';
import Worker from '../models/Worker';
import { AuthRequest } from '../middleware/auth';
import redis from '../config/redis';
import { io } from '../index';
import { createRazorpayOrder, verifyRazorpaySignature } from '../services/payment.service';
import { generateInvoicePDF, uploadInvoiceToS3, sendBookingConfirmationEmail } from '../services/email.service';

export const lockSlot = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { serviceId, date, time } = req.body;
    const userId = req.user?.id;

    if (!serviceId || !date || !time) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const lockKey = `slot:${serviceId}:${date}:${time}`;
    
    // In a real app we'd need to consider worker availability here.
    // For simplicity, we just use a single lock per timeslot per user or general lock if 1 worker limit
    // To allow multiple concurrent bookings up to available workers, we'd need a more complex Redis logic (e.g. lists or sets).
    // The spec says: "Redis SET NX with 10-minute TTL". So let's use a unique lock key per user for that slot.
    const userLockKey = `slot:${serviceId}:${date}:${time}:user:${userId}`;
    const locked = await redis.set(userLockKey, userId as string, 'EX', 600, 'NX');

    if (!locked) {
      res.status(409).json({ message: 'SLOT_TAKEN' });
      return;
    }

    res.json({ message: 'Slot locked successfully', lockKey: userLockKey });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const releaseSlot = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lockKey } = req.body;
    await redis.del(lockKey);
    res.json({ message: 'Slot released' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createBookingOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { serviceId, date, time, finalAmount } = req.body;
    const userId = req.user?.id;

    // Create Razorpay order
    const order = await createRazorpayOrder(finalAmount * 100);

    // Create pending booking
    const booking = await Booking.create({
      userId,
      serviceId,
      slotDate: date,
      slotTime: time,
      status: 'PENDING',
      finalAmount,
      commissionAmount: finalAmount * 0.20
    });

    // Create payment record
    await Payment.create({
      bookingId: booking._id,
      razorpayOrderId: order.id,
      amount: finalAmount,
      status: 'CREATED'
    });

    res.json({ orderId: order.id, bookingId: booking._id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const confirmPaymentWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, paymentId, signature, bookingId } = req.body; // Mock webhook body
    
    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    if (!isValid) {
      res.status(400).json({ message: 'Invalid signature' });
      return;
    }

    const payment = await Payment.findOne({ razorpayOrderId: orderId });
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    payment.status = 'SUCCESS';
    payment.razorpayPaymentId = paymentId;
    payment.webhookVerified = true;
    await payment.save();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    booking.status = 'CONFIRMED';
    
    // Auto assign worker logic (simplified for mock)
    const worker = await Worker.findOne({ serviceId: booking.serviceId, status: 'AVAILABLE' });
    if (worker) {
      booking.workerId = worker._id as any;
      worker.status = 'BUSY';
      await worker.save();
    }
    
    await booking.save();

    // Broadcast update via socket
    io.emit('booking_confirmed', { bookingId: booking._id });

    res.json({ message: 'Payment verified and booking confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const bookings = await Booking.find({ userId }).populate('serviceId').populate('workerId');
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find().populate('serviceId').populate('workerId').populate('userId', 'name email');
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
