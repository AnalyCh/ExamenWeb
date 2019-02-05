import {IsNotEmpty, IsEmail, Matches, IsString, IsNumberString, IsNumber, IsEnum, IsOptional, Length} from 'class-validator'

export class UsuarioDto {
    
    // @IsNumber()
    usuario_id: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(([^<>()&[\]\.,;:\s@\"]+(\.[^<>&()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>&()[\]\.,;:\s@\"]+\.)+[^<>&()[\]\.,;:\s@\"]{2,})$/)
    correo: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/)
    password: string;


    @IsNotEmpty()
    // @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
    fecha_nacimiento: Date;

    
}
