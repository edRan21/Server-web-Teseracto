// web-server/src/core/middleware/roles.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './jwt.middleware';

export const requireRole = (allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Usuario no autenticado'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Permisos insuficientes para esta operación'
            });
        }

        next();
    };
};

// Middlewares específicos por rol
export const requireSuperAdmin = requireRole(['super_admin']);
export const requireAdmin = requireRole(['super_admin', 'admin']);
export const requireAnyAuth = requireRole(['super_admin', 'admin', 'user']);