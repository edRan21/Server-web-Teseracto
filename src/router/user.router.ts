import {BaseRouter} from './router.js';
import { UserController } from '../controllers/user.controller.js';
export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        super(UserController)
    }

    routes(): void {
        this.router.get('/user', (req, res)=> this.controller.getUsers(req, res));
    }
}