import {IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsDateString, IsBooleanString} from "class-validator"

export class CreateEventoPorConductorDto {
    @IsNotEmpty({message: 'conductor no puede ser vacio'})
    @IsNumber()
    idConductor: number;

    @IsNotEmpty({message: 'evento no puede ser vacio'})
    @IsNumber()
    idEvento: number;


}