import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class ServerBootstrap {
    public app: express.Application;
    private port: number;

    //* La función 'constructor' es propia de node.js, esta inicializa todas las funciones y consigo varibles que esten dentro de la clase para que puedan 
    // compilarse y construir el servidor *//
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '8000');
        
        this.configureMiddlewares();
        this.configureRoutes();
        this.startServer();
    }

    private configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

// Variable con la configuración de las rutas

    private configureRoutes(): void {
        // Ruta de salud Y principal
        this.app.get('/api/estado', (req, res) => {
            res.status(200).json({
                status: 'success',
                message: 'Servidor funcionando correctamente',
                timestamp: new Date().toISOString()
            });
        });

        // Ruta por defecto
        this.app.get('/api/servidor', (req, res) => {
            res.status(200).json({
                message: 'Bienvenido al servidor de telemetría',
                version: '1.0.0'
            });
        });
    }


    // Variable que sera usada como una Función 'publica' que indica en la terminal la escucha del servidor al compilar
    public startServer(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor escuchando en el puerto => ${this.port}`);
            console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 URL: http://localhost:${this.port}`);
        });
    }
}

// Inicializar servidor
new ServerBootstrap();