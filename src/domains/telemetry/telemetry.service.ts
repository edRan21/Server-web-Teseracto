// web-server/src/domains/telemetry/telemetry.service.ts

import { AppDataSource } from "../../core/database/connection";
import { TelemetryData } from "./telemetry-data.entity";
import { UTR } from "../utrs/utr.entity";

export class TelemetryService {
    private telemetryRepo = AppDataSource.getRepository(TelemetryData);
    private utrRepo = AppDataSource.getRepository(UTR);


    async procesTelemetryData(payload: any) {
        // 1. Buscar la UTR por NSUE
        const utr = await this.utrRepo.findOne({

            where: { nsue: payload.nsue }
        });

        if (!utr) { 
            throw new Error(`UTR con NSUE ${payload.nsue} no encontrada`);
        }

        // 2. Crear registro de telemetría
        const TelemetryData = this.telemetryRepo.create({
            utr_id: utr.id,
            flow_instant: payload.flow_instant,
            flow_accumulated: payload.flow_accumulated,
            flow_velocity: payload.flow_velocity,
            flow_direction: payload.flow_direction,
            ker_code: payload.ker_code,
            unit_measurement: payload.unit_measurement
            // timestamp se genera automáticamente
        });

        // 3. Guardara en base de datos
        const savedData = await this.telemetryRepo.save(TelemetryData);

        // 4. Actualizar última posición de la UTR
        await this.utrRepo.update(utr.id, {
            latitude: payload.latitude,
            longitude: payload.longitude
        });

        return {
            id: savedData.id,
            utr_id: savedData.utr_id,
            timestamp: savedData.timestamp
        };
    }
}