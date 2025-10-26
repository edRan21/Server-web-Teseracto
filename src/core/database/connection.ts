// src/core/database/connection.ts
import { DataSource } from 'typeorm';
import { config } from '../config/environment';
import { Client } from '../../domains/clients/client.entity';
import { User } from '../../domains/users/user.entity';
import { UTR } from '../../domains/utrs/utr.entity';
import { TelemetryData } from '../../domains/telemetry/telemetry-data.entity';
import { Report } from '../../domains/reports/report.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB.HOST,
    port: config.DB.PORT,
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.NAME,
    entities: [Client, User, UTR, TelemetryData, Report],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    });

    export const initializeDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('✅ Base de datos PostgreSQL conectada');
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
};