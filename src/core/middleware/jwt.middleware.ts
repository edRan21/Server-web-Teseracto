// web-server/src/core/middleware/jwt.middleware.ts
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/environment';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        username: string; // CAMBIO: username en lugar de email
        role: string;
        client_id?: number;
    };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Token de acceso requerido'
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, config.JWT.SECRET) as any;
        req.user = {
            id: decoded.id,
            username: decoded.username, // CAMBIO: username en lugar de email
            role: decoded.role,
            client_id: decoded.client_id
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Token inválido o expirado'
        });
    }
};