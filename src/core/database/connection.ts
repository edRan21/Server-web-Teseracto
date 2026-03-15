// server-web/src/core/database/connection.ts

// Configuración TypeORM: Configuramos el entorno 

import { DataSource } from 'typeorm';
import { config } from '../config/environment';
import { Client } from '../../domains/clients/client.entity';
import { User } from '../../domains/users/user.entity';
import { UTR } from '../../domains/utrs/utr.entity';
import { TelemetryData } from '../../domains/telemetry/telemetry-data.entity';
import { Report } from '../../domains/reports/report.entity';

// Importamos las entidades representadas en código de sus directorios correspondientes de la base de datos que se creo.

// Suponiendo la sintaxis de Typescript el método 'export const' obtiene los datos por la función 'AppDataSource' como un nuevo objeto con
// parametros para contectarse a la DB
// se llama 'export', porque sera una constante que se podra obtener en otro lado del proyecto.

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB.HOST,
    port: config.DB.PORT,
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.NAME,
    entities: [Client, User, UTR, TelemetryData, Report],
    synchronize: process.env.NODE_ENV !== 'production', //* La IA indica que la propiedad 'synchronize'
    // el valor que es la ubicación del ".env" sea diferente a alguno demoninado como 'producción' *//
    logging: process.env.NODE_ENV !== 'production',
    });

// Realiza la conexión con la función o la inicializa, 'AppDataSource' contiene los parametros necesarios para realizar el intento de forma asincronica a la base de dato. 
    export const initializeDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('✅ Base de datos PostgreSQL conectada');
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
};