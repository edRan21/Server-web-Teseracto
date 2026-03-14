import { IsString, MinLength, IsIn, IsOptional, IsBoolean, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio'})
    @Matches(/^[a-zA-Z0-9_]+$/, { 
        message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' 
    })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    username: string;


    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria '})
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
    
    @IsString({ message: 'El rol debe ser una cadena de texto'})
    @IsIn(['super_admin', 'admin', 'user'], { message: 'Rol inválido' })
    role: string;

    @IsOptional()
    client_id?: number;

    @IsBoolean({ message: 'is_active debe ser un valor booleano' })
    @IsOptional()
    is_active?: boolean;
}
