// web-server/src/domains/auth/dto/login.dto.ts

import { Matches, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsString({ message: 'El formato del nombre de usuario es inválido' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @Matches(/^[a-zA-Z0-9_]+$/, { 
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' 
    })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    username: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}

export class AuthResponseDto {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: number;
        username: string;
        role: string;
        client_id?: number;
    };
}