"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const user_router_1 = require("./router/user.router");
const connection_1 = require("./core/database/connection");
const environment_1 = require("./core/config/environment");
class ServerBootstrap {
    constructor() {
        this.app = express();
        this.port = environment_1.config.PORT;
        this.initializeServer();
    }
    async initializeServer() {
        try {
            // Middlewares
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(morgan('dev'));
            this.app.use(cors({
                origin: environment_1.config.FRONTEND_URL,
                credentials: true
            }));
            // Database
            await (0, connection_1.initializeDatabase)();
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
        }
        catch (error) {
            console.error('❌ Error inicializando servidor:', error);
            process.exit(1);
        }
    }
    routers() {
        return [new user_router_1.UserRouter().router];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(` Servidor escuchando en el puerto ${this.port}`);
            console.log(` Entorno: ${process.env.NODE_ENV}`);
            console.log(` Health check: http://localhost:${this.port}/health`);
        });
    }
}
new ServerBootstrap();
//# sourceMappingURL=server.js.map