// server-web/src/core/config/environment.ts

export const config = {
    PORT: parseInt(process.env.PORT || '8000'),
    
    // Database- Con valores por para conectarse a la nueva base de datos de Teseracto
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: parseInt(process.env.DB_PORT || '5432'),
        USERNAME: process.env.DB_USERNAME || 'postgres',
        PASSWORD: process.env.DB_PASSWORD || 'Vitriol10',
        NAME: process.env.DB_NAME || 'teseracto_db'
    },
    
    // Auth - Con valores para sus pruebas 

    JWT: {
        SECRET: process.env.JWT_SECRET || 'teseracto_servidor_de_telemetrias',
        EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h'
    },
    
    // Llave de la API para validar la transmisión de datos de la UTRs al servidor
    API_KEY_DEVICES: process.env.API_KEY_DEVICES || 'teseracto_key_utrs_2025',

    // Frontend
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};