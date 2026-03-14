// web-server/src/domains/users/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AuthenticatedRequest } from '../../core/middleware/jwt.middleware';

export class UserController {
    private userService = new UserService();

    /**
     * Obtener todas las cuentas (solo SUPER_ADMIN)
     */
    async getAllUsers(req: AuthenticatedRequest, res: Response) {
        try {
            // Solo SUPER_ADMIN puede ver todos los usuarios
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Permisos insuficientes. Solo el SUPER_ADMIN puede ver todas las cuentas.'
                });
            }

            const result = await this.userService.getAllUsers();

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                users: result.users
            });

        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener estadísticas de usuarios (solo SUPER_ADMIN)
     */
    async getUserStats(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede ver las estadísticas'
                });
            }

            const result = await this.userService.getUserStats();

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                stats: result.stats
            });

        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener usuario específico por ID (solo SUPER_ADMIN)
     */
    async getUserById(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede ver información de usuarios'
                });
            }

            // Validar que req.params.id existe y es string
            if (!req.params.id || typeof req.params.id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario no proporcionado o inválido'
                });
            }

            const userId = parseInt(req.params.id);

            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario inválido'
                });
            }

            const result = await this.userService.getUserById(userId);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.status(200).json({
                success: true,
                user: result.user
            });

        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Activar/desactivar usuario (solo SUPER_ADMIN)
     */
    async toggleUserStatus(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede modificar usuarios'
                });
            }

            // Validar que req.params.id existe y es string
            if (!req.params.id || typeof req.params.id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario no proporcionado o inválido'
                });
            }

            const userId = parseInt(req.params.id);
            const { is_active } = req.body;

            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario inválido'
                });
            }

            if (typeof is_active !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    error: 'El campo is_active debe ser un valor booleano'
                });
            }

            // No permitir desactivarse a sí mismo
            if (userId === req.user.id) {
                return res.status(400).json({
                    success: false,
                    error: 'No puedes desactivar tu propia cuenta'
                });
            }

            const result = await this.userService.toggleUserStatus(userId, is_active);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                message: `Usuario ${is_active ? 'activado' : 'desactivado'} correctamente`
            });

        } catch (error) {
            console.error('Error cambiando estado de usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Desbloquear usuario (solo SUPER_ADMIN)
     */
    async unlockUser(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede desbloquear usuarios'
                });
            }

            // Validar que req.params.id existe y es string
            if (!req.params.id || typeof req.params.id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario no proporcionado o inválido'
                });
            }

            const userId = parseInt(req.params.id);

            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario inválido'
                });
            }

            const result = await this.userService.unlockUser(userId);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                message: 'Usuario desbloqueado correctamente'
            });

        } catch (error) {
            console.error('Error desbloqueando usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Eliminar usuario (solo SUPER_ADMIN)
     */
    async deleteUser(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede eliminar usuarios'
                });
            }

            // Validar que req.params.id existe y es string
            if (!req.params.id || typeof req.params.id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario no proporcionado o inválido'
                });
            }

            const userId = parseInt(req.params.id);

            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario inválido'
                });
            }

            // No permitir eliminarse a sí mismo
            if (userId === req.user.id) {
                return res.status(400).json({
                    success: false,
                    error: 'No puedes eliminar tu propia cuenta'
                });
            }

            const result = await this.userService.deleteUser(userId);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado correctamente'
            });

        } catch (error) {
            console.error('Error eliminando usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Actualizar usuario (solo SUPER_ADMIN)
     */
    async updateUser(req: AuthenticatedRequest, res: Response) {
        try {
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede actualizar usuarios'
                });
            }

            // Validar que req.params.id existe y es string
            if (!req.params.id || typeof req.params.id !== 'string') {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario no proporcionado o inválido'
                });
            }

            const userId = parseInt(req.params.id);
            const updateData = req.body;

            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario inválido'
                });
            }

            // No permitir actualizar el propio rol a no super_admin
            if (userId === req.user.id && updateData.role && updateData.role !== 'super_admin') {
                return res.status(400).json({
                    success: false,
                    error: 'No puedes cambiar tu propio rol de SUPER_ADMIN'
                });
            }

            const result = await this.userService.updateUser(userId, updateData);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado correctamente'
            });

        } catch (error) {
            console.error('Error actualizando usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }
}