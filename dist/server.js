import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router.js';
class ServerBootstrap {
    //* La función 'constructor' es propia de node.js, esta inicializa todas las funciones y consigo varibles que esten dentro de la clase para que puedan 
    // compilarse y construir el servidor *//
    constructor() {
        this.app = express();
        this.port = 8000;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use("/api", this.routers());
        this.listen();
    }
    routers() {
        return [new UserRouter().router];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en el puerto" + this.port);
        });
    }
}
// Inicializar servidor
new ServerBootstrap();
//# sourceMappingURL=server.js.map