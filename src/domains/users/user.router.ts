// web-server/src/router/user.router.ts

import { BaseRouter } from '../../router/router';
import { UserController } from './user.controller';

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController);
    }

    routes(): void {
        this.router.get('/user', (req, res) => this.controller.getUsers(req, res));
    }
}