
import {IsNotEmpty, IsString, IsNumber} from "class-validator";
import {CreateConductorDto} from "../../conductor/dto/create-conductor.dto";


export class CreateAutoDto{
    @IsNotEmpty()
    @IsNumber()
    chasis: number;

    @IsNotEmpty()
    @IsString()
    nombreMarca: string;

    @IsNotEmpty()
    @IsString()
    colorUno: string;

    @IsNotEmpty()
    @IsString()
    colorDos: string;

    @IsNotEmpty()
    @IsString()
    nombreModelo: string;

    @IsNotEmpty()
    @IsNumber()
    anio: number;

    @IsNotEmpty()
    @IsNumber()
    idConductor: number;

    @IsNotEmpty()
    @IsNumber()
    idUsuario: number;



}