import {IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsDateString, IsBooleanString} from "class-validator"

export class CreateConductorDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsDateString()
    //@IsDate()
    fechaDeNacimiento: string;

    @IsNotEmpty()
    @IsBoolean()
    licenciaValida: boolean;


}