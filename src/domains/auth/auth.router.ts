// web-server/src/domains/auth/auth.router.ts
import { BaseRouter } from '../../router/router';
import { AuthController } from './auth.controller';
import { validationMiddleware } from '../../core/middleware/validation.middleware';
import { authenticateJWT } from '../../core/middleware/jwt.middleware';
import { requireSuperAdmin } from '../../core/middleware/roles.middleware';
import { LoginDto, CreateUserDto } from './dto';

export class AuthRouter extends BaseRouter<AuthController> {
    constructor() {
        super(AuthController);
    }

    routes(): void {
        // Login público
        this.router.post(
            '/login', 
            validationMiddleware(LoginDto),
            (req, res) => this.controller.login(req, res)
        );

        // Rutas protegidas
        this.router.post(
            '/users',
            authenticateJWT,
            requireSuperAdmin,
            validationMiddleware(CreateUserDto),
            (req, res) => this.controller.createUser(req, res)
        );

        this.router.get(
            '/profile',
            authenticateJWT,
            (req, res) => this.controller.getProfile(req, res)
        );

        this.router.post(
            '/logout',
            authenticateJWT,
            (req, res) => this.controller.logout(req, res)
        );
    }
}