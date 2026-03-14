// web-server/src/domains/auth/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto } from './dto';
import { validationMiddleware } from '../../core/middleware/validation.middleware';
import { AuthenticatedRequest } from '../../core/middleware/jwt.middleware';

export class AuthController {
    private authService = new AuthService();

    /**
     * Login de usuario
     */
    async login(req: Request, res: Response) {
        try {
            const loginDto: LoginDto = req.body;
            const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

            const result = await this.authService.login(loginDto, ipAddress);

            if (!result.success) {
                return res.status(401).json(result);
            }

            res.status(200).json(result);

        } catch (error) {
            console.error('Error en controlador de login:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Crear usuario (solo SUPER_ADMIN)
     */
    async createUser(req: AuthenticatedRequest, res: Response) {
        try {
            const createUserDto: CreateUserDto = req.body;

            // Solo SUPER_ADMIN puede crear usuarios
            if (req.user?.role !== 'super_admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Solo el SUPER_ADMIN puede crear usuarios'
                });
            }

            const result = await this.authService.createUser(createUserDto);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                user: result.user
            });

        } catch (error) {
            console.error('Error creando usuario:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener perfil de usuario
     */
    async getProfile(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Usuario no autenticado'
                });
            }

            const result = await this.authService.getProfile(req.user.id);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.status(200).json({
                success: true,
                user: result.user
            });

        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Logout (manejado en frontend eliminando el token)
     */
    async logout(req: AuthenticatedRequest, res: Response) {
        try {
            // En JWT stateless, el logout se maneja en el cliente eliminando el token
            res.status(200).json({
                success: true,
                message: 'Logout exitoso'
            });

        } catch (error) {
            console.error('Error en logout:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }
}