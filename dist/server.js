import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
class ServerBootstrap {
    constructor() {
        this.app = express();
        this.port = 8000;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en el puerto =>" + this.port);
        });
    }
}
new ServerBootstrap();
//# sourceMappingURL=server.js.map