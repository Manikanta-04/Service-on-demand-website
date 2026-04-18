import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id?: string;
    role: string;
  };
}

export const authMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id?: string; role: string };
      
      if (!roles.includes(decoded.role)) {
        res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        return;
      }

      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
