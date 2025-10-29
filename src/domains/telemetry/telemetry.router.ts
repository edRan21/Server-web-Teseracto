// web-server/src/domains/telemetry/telemetry.router.ts

import { BaseRouter } from "../../router/router";
import { TelemetryController } from "./telemetry.controller";
import { apiKeyAuth } from "../../core/middleware/auth.middleware";

export class TelemetryRouter extends BaseRouter<TelemetryController> {
    constructor() {
        super(TelemetryController);
    }

    routes(): void {
        this.router.post('/telemetry', apiKeyAuth, (req, res) => this.controller.receiveTelemetryData(req, res));
    }
}