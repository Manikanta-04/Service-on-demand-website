import { Request, Response } from 'express';
import Service from '../models/Service';
import Worker from '../models/Worker';
import { calculateHaversineDistance, getCoordinatesFromAddress } from '../services/map.service';

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng, radius = 10, address } = req.query;
    
    let searchLat = lat ? parseFloat(lat as string) : undefined;
    let searchLng = lng ? parseFloat(lng as string) : undefined;

    if (address && (!searchLat || !searchLng)) {
      const coords = await getCoordinatesFromAddress(address as string);
      searchLat = coords.lat;
      searchLng = coords.lng;
    }

    const services = await Service.find({ isActive: true });

    if (!searchLat || !searchLng) {
      res.json({ services });
      return;
    }

    // Filter services based on available workers within radius
    const filteredServices = [];
    for (const service of services) {
      const workers = await Worker.find({ serviceId: service._id, status: 'AVAILABLE' });
      const nearbyWorkers = workers.filter(w => {
        const dist = calculateHaversineDistance(searchLat!, searchLng!, w.location.lat, w.location.lng);
        return dist <= (radius as number);
      });
      
      if (nearbyWorkers.length > 0) {
        filteredServices.push({
          ...service.toObject(),
          availableWorkersCount: nearbyWorkers.length,
          nearestWorkerDistance: Math.min(...nearbyWorkers.map(w => calculateHaversineDistance(searchLat!, searchLng!, w.location.lat, w.location.lng)))
        });
      }
    }

    res.json({ services: filteredServices, lat: searchLat, lng: searchLng });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
