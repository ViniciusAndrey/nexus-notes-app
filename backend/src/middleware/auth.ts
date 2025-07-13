import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/users.model';

// Extendendo a interface Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token de acesso necessário' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
}; 