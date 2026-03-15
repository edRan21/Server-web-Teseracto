// web-server/src/domains/users/user.router.ts
import { BaseRouter } from '../../router/router';
import { UserController } from './user.controller';
import { authenticateJWT} from '../../core/middleware/jwt.middleware';
import { requireSuperAdmin } from '../../core/middleware/roles.middleware';

export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController);
    }

    routes(): void {
        // Obtener todas las cuentas (solo SUPER_ADMIN)
        this.router.get('/', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.getAllUsers(req, res)
        );

        // Obtener estadísticas (solo SUPER_ADMIN)
        this.router.get('/stats', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.getUserStats(req, res)
        );

        // Obtener usuario específico por ID (solo SUPER_ADMIN)
        this.router.get('/:id', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.getUserById(req, res)
        );

        // Actualizar usuario (solo SUPER_ADMIN)
        this.router.put('/:id', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.updateUser(req, res)
        );

        // Eliminar usuario (solo SUPER_ADMIN)
        this.router.delete('/:id', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.deleteUser(req, res)
        );

        // Activar/desactivar usuario (solo SUPER_ADMIN)
        this.router.patch('/:id/status', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.toggleUserStatus(req, res)
        );

        // Desbloquear usuario (solo SUPER_ADMIN)
        this.router.patch('/:id/unlock', authenticateJWT, requireSuperAdmin, (req, res) => 
            this.controller.unlockUser(req, res)
        );
    }
}