/* Dentro del directorio de "web-server/src/router/", el directorio 'router/'
es en donde se encontrará el arbol de rutas del servidor.

El archivo 'router.ts' va a ser como una "bandera", que se va a extender a partir de todas las rutas que se vayan a crear, este va a interpretar, ó
obtener toda la parte de configuración de esta ruta o base 
*/

import { Router } from "express";

// Esta clase no se va a utilizar para declararla en 'server.ts', sino que se va a utilizarla como bandera para extender clases
export class BaseRouter<T> {
    public router: Router;
    public controller: T
    // public middleware: U
    constructor(TController: { new (): T }) {
        this.router = Router()
        this.controller = new TController()
        this.routes();
    }

    routes() {}
}