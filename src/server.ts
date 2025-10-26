import 'reflect-metadata';

import express = require('express');
import morgan = require('morgan');
import cors = require('cors');
import { UserRouter } from './router/user.router';
import { initializeDatabase } from './core/database/connection';
import { config } from './core/config/environment';

class ServerBootstrap {
    public app: express.Application = express();
    private port: number = config.PORT;

    constructor() {
        this.initializeServer();
    }

    private async initializeServer() {
        try {
        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: config.FRONTEND_URL,
            credentials: true
        }));

        // Database
        await initializeDatabase();

        // Routes
        this.app.use('/api', this.routers());
        
        // Health check
        this.app.get('/health', (req, res) => {
            res.status(200).json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            database: 'Connected' 
            });
        });

        this.listen();
        } catch (error) {
        console.error('❌ Error inicializando servidor:', error);
        process.exit(1);
        }
    }

    routers(): express.Router[] {
        return [new UserRouter().router];
    }

    public listen() {
        this.app.listen(this.port, () => {
        console.log(` Servidor escuchando en el puerto ${this.port}`);
        console.log(` Entorno: ${process.env.NODE_ENV}`);
        console.log(` Health check: http://localhost:${this.port}/health`);
        });
    }
}

new ServerBootstrap();