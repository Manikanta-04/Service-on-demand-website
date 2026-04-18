import { Request, Response } from 'express';
import Service from '../models/Service';
import Booking from '../models/Booking';

export const getSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId = req.query.serviceId as string;
    const date = req.query.date as string;

    if (!serviceId || !date) {
      res.status(400).json({ message: 'serviceId and date are required' });
      return;
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    const totalWorkers = service.workerCount || 10; // Mock fallback if 0
    const workingHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

    const bookings = await Booking.find({ serviceId, slotDate: date, status: { $in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] } });

    const slots = workingHours.map(time => {
      const bookingsForSlot = bookings.filter(b => b.slotTime === time).length;
      return {
        time,
        available_count: Math.max(0, totalWorkers - bookingsForSlot)
      };
    });

    res.json({ slots });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
