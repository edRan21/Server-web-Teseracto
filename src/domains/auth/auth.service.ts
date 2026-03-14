// web-server/src/domains/auth/auth.service.ts
import { AppDataSource } from '../../core/database/connection';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from '../../core/config/environment';
import { LoginDto, AuthResponseDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    /**
     * Generar token JWT
     */
    private generateToken(user: User): string {
        const payload = {
            id: user.id,
            username: user.username, //
            role: user.role,
            client_id: user.client_id
        };

        // SOLUCIÓN APLICADA - OPCIÓN 1 (Recomendada)
        return jwt.sign(
            payload, 
            config.JWT.SECRET as jwt.Secret, // ← CORRECCIÓN AQUÍ
            {
                expiresIn: config.JWT.EXPIRES_IN as jwt.SignOptions['expiresIn'] // ← Y AQUÍ
            }
        );
    }

    /**
     * Verificar contraseña
     */
    private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    /**
     * Hash de contraseña
     */
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds);
    }

    /**
     * Validar intentos de login y bloqueo
     */
    private validateLoginAttempts(user: User): { allowed: boolean; message?: string } {
        const now = new Date();

        // Verificar si la cuenta está bloqueada temporalmente
        if (user.is_locked && user.locked_until && user.locked_until > now) {
            return { 
                allowed: false, 
                message: 'Cuenta bloqueada. Contacte al administrador.' 
            };
        }

        // Verificar si excedió los intentos (3 máximo)
        if (user.failed_login_attempts >= 3) {
            // Bloquear la cuenta por 24 horas
            user.is_locked = true;
            user.locked_until = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            this.userRepository.save(user);

            return { 
                allowed: false, 
                message: 'Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador.' 
            };
        }

        return { allowed: true };
    }

    /**
     * Login de usuario - CAMBIO: buscar por username en lugar de email
     */
    async login(loginDto: LoginDto, ipAddress: string): Promise<AuthResponseDto> {
        try {
            // Buscar usuario por USERNAME (no email)
            const user = await this.userRepository.findOne({
                where: { username: loginDto.username },
                relations: ['client']
            });

            if (!user) {
                return {
                    success: false,
                    message: 'Credenciales incorrectas'
                };
            }

            // Validar intentos de login
            const validation = this.validateLoginAttempts(user);
            if (!validation.allowed) {
                return {
                    success: false,
                    message: validation.message!
                };
            }

            // Verificar contraseña
            const isPasswordValid = await this.verifyPassword(loginDto.password, user.password_hash);
            
            if (!isPasswordValid) {
                // Incrementar contador de intentos fallidos
                user.failed_login_attempts += 1;
                user.last_login_ip = ipAddress;
                await this.userRepository.save(user);

                return {
                    success: false,
                    message: 'Credenciales incorrectas'
                };
            }

            // Verificar si el usuario está activo
            if (!user.is_active) {
                return {
                    success: false,
                    message: 'Cuenta desactivada. Contacte al administrador.'
                };
            }

            // Login exitoso - resetear contadores
            user.failed_login_attempts = 0;
            user.is_locked = false;
            user.locked_until = null;
            user.last_login_ip = ipAddress;
            await this.userRepository.save(user);

            // Generar token
            const token = this.generateToken(user);

            return {
                success: true,
                message: 'Login exitoso',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    client_id: user.client_id
                }
            };

        } catch (error) {
            console.error('Error en servicio de login:', error);
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }

    /**
     * Crear nuevo usuario (solo para SUPER_ADMIN) - CAMBIO: username en lugar de email
     */
    async createUser(createUserDto: CreateUserDto): Promise<{ success: boolean; user?: any; error?: string }> {
        try {
            // Verificar si el USERNAME ya existe (no email)
            const existingUser = await this.userRepository.findOne({
                where: { username: createUserDto.username }
            });

            if (existingUser) {
                return {
                    success: false,
                    error: 'El nombre de usuario ya está registrado'
                };
            }

            // Hash de la contraseña
            const passwordHash = await this.hashPassword(createUserDto.password);

            // Crear usuario
            const user = this.userRepository.create({
                username: createUserDto.username, // CAMBIO: username en lugar de email
                password_hash: passwordHash,
                role: createUserDto.role,
                client_id: createUserDto.client_id,
                is_active: createUserDto.is_active !== undefined ? createUserDto.is_active : true
            });

            const savedUser = await this.userRepository.save(user);

            // No retornar el password_hash
            const { password_hash, ...userWithoutPassword } = savedUser;

            return {
                success: true,
                user: userWithoutPassword
            };

        } catch (error) {
            console.error('Error creando usuario:', error);
            return {
                success: false,
                error: 'Error interno del servidor al crear usuario'
            };
        }
    }

    /**
     * Obtener perfil de usuario - CAMBIO: incluir username en lugar de email
     */
    async getProfile(userId: number): Promise<{ success: boolean; user?: any; error?: string }> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['client'],
                select: ['id', 'username', 'role', 'client_id', 'is_active', 'created_at', 'updated_at']
            });

            if (!user) {
                return {
                    success: false,
                    error: 'Usuario no encontrado'
                };
            }

            return {
                success: true,
                user
            };

        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            return {
                success: false,
                error: 'Error interno del servidor'
            };
        }
    }
}