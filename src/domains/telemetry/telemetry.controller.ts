// web-server/src/domains/telemetry/telemetry.controller.ts

import { Request, Response } from "express";
import { TelemetryService } from "./telemetry.service";

export class TelemetryController {
    private telemetryService = new TelemetryService();

    async receiveTelemetryData(req: Request, res: Response) {
        try {
            const payload = req.body;

            // Validaciones básicas
            if (!payload.nsut || !payload.rfc) {
                return res.status(400).json({
                    error: 'Petición incorrecta',
                    message: 'Los campos nsut y rfc son obligatorios'
                });
            }

            // Procesar datos
            const result = await this.telemetryService.processTelemetryData(payload);

            res.status(201).json({
                success: true,
                message: 'Datos de telemetría recibidos correctamente',
                data: result
            });
        } catch (error: any) {
            console.error('Error procesando telemetría:', error);

            if (error.message.includes('no encontrada')) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: error.message
                });
            }
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error procesando datos de telemetría'
            });
        }
    }
}