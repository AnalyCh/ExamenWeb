import {IsNotEmpty, IsString, IsDate, IsBoolean} from "class-validator"

export class CreateEventoDto{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsDate()
    fecha: Date;
    
    @IsNotEmpty()
    @IsString()
    latitud: string;

    @IsNotEmpty()
    @IsString()
    longitud: string;
    
}
