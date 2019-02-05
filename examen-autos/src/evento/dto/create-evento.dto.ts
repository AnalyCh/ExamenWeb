import {IsNotEmpty, IsString, IsDate, IsBoolean, IsDateString} from "class-validator"

export class CreateEventoDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsDateString()
    fecha: string;
    
    @IsNotEmpty()
    @IsString()
    latitud: string;

    @IsNotEmpty()
    @IsString()
    longitud: string;
    
}
