
import {IsNotEmpty, IsOptional, IsString, IsNumber} from "class-validator";


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
    conductor: number;

}