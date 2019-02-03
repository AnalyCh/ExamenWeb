import {IsNotEmpty, IsString, IsDate, IsBoolean} from "class-validator"

export class CreateConductorDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsDate()
    fechaDeNacimiento: Date;

    @IsNotEmpty()
    @IsBoolean()
    licenciaValida: boolean;


}