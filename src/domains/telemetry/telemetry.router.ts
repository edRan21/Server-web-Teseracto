// web-server/src/domains/telemetry/telemetry.router.ts

import { BaseRouter } from "../../router/router";
import { TelemetryController } from "./telemetry.controller";
import { apiKeyAuth } from "../../core/middleware/auth.middleware";
import { authenticateJWT } from "../../core/middleware/jwt.middleware";

export class TelemetryRouter extends BaseRouter<TelemetryController> {
    constructor() {
        super(TelemetryController);
    }

    routes(): void {
        // La ruta original (para que la UTR máquina física envíe datos)
        this.router.post('/telemetry', apiKeyAuth, (req, res) => this.controller.receiveTelemetryData(req, res));

        // Nueva ruta: para que el panel administrador web consulte los detalles de una UTR maquina
        this.router.get('/utr/:id', authenticateJWT, (req, res) => this.controller.getTelemetryByUtrId(req, res));
    }
}