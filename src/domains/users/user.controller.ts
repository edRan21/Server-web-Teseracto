// server-web/src/controllers/user.controller.ts

import type { Request, Response} from "express";

export class UserController {
    getUsers(req: Request, res:Response) {
        res.status(200).json({
            user: "Teseracto.inc",
            useradmin: "RootH"
        });
    }
}