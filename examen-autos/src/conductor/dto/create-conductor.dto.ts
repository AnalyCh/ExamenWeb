import {IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsDateString, IsBooleanString} from "class-validator"

export class CreateConductorDto{
    @IsNotEmpty({message: 'Nombre no puede ser vacio'})
    @IsString({message: 'Nombre debe ser string'})
    nombre: string;

    @IsNotEmpty({message: 'Apellido no puede ser vacio'})
    @IsString()
    apellido: string;

    @IsNotEmpty({message: 'Fecha no puede ser vacio'})
    @IsDateString()
    //@IsDate()
    fechaDeNacimiento: string;

    @IsNotEmpty({message: 'Licencia no puede ser vacio'})
    @IsBoolean()
    licenciaValida: boolean;


}