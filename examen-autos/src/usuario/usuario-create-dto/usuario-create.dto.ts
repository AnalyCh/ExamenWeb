import {
    IsOptional,
    IsInt,
    IsString,
    IsNotEmpty,
    IsDateString,
    IsEmail,
    MinLength,
    MaxLength,
    Matches, IsAlpha, IsDate, IsNotIn
} from 'class-validator';
import {max, min} from 'rxjs/operators';

export class UsuarioDto {

    @IsOptional()
    @IsInt()
    id?:number;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]{1,45}$/)

    nombre_usuario?:string;


    @IsNotEmpty()
    @IsEmail()
    email_usuario?:string;

    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$/)
    @IsString()
        @IsNotEmpty()

    password_usuario?:string;


    @IsString()
    @IsNotEmpty()
    fecha_nacimiento_usuario?:string;

}