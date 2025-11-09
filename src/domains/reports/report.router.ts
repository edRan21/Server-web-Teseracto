// src/domains/reports/report.router.ts
import { BaseRouter } from '../../router/router';
import { ReportController } from './report.controller';
import { apiKeyAuth } from '../../core/middleware/auth.middleware';

export class ReportRouter extends BaseRouter<ReportController> {
    constructor() {
        super(ReportController);
    }

    routes(): void {
        // Endpoint para recibir reportes (individual o lote)
        this.router.post('/reports', apiKeyAuth, (req, res) => 
            this.controller.receiveReports(req, res)
        );
    }
}