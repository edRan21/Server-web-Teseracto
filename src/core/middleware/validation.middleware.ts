// web-server/src/core/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validationMiddleware = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        
        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            const errorMessages = errors.map(error => 
                Object.values(error.constraints || {})).flat();
            
            return res.status(400).json({
                success: false,
                error: 'Datos de entrada inválidos',
                details: errorMessages
            });
        }

        req.body = dtoObject;
        next();
    };
};