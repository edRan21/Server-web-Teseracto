// web-server/src/core/middleware/auth.middleware.ts

// Es el encargado de válidar que la API que envia el software industrial
// para hacer el envió de datos contenga la clave correcta el cual servidor indicará como la indicada si se encuentra en 'environment.ts'

// Importamos las funciones que el servidor dará en la situaciones en la que no se reciba una API Key válida de las utrs
import { Request, Response, NextFunction } from "express";  
// importación que llama una constante  de otro archivo que contiene el objeto, el cual es 'API_KEY_DEVICE' 
import {config} from '../config/environment' 

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('X-API-Key') || req.header('Authorization')?.replace('Bearer', '');

    if(!apiKey) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'La API Key es requerida'
        });
    }

    if (apiKey !== config.API_KEY_DEVICES) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'API Key no válida'
        });
    }
    
    next();
};
