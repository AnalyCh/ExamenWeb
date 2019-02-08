
import {IsNotEmpty, IsString, IsNumber} from "class-validator";



export class CreateAutoDto{
    @IsNotEmpty({ message: 'Campo chasis no se puede dejar vacio'})
    @IsNumber()
    chasis: number;

    @IsNotEmpty({message: 'Campo Marca no se puede dejar vacio'})
    @IsString({message: 'Campo Marca debe ser un string'})
    nombreMarca: string;

    @IsNotEmpty({message: 'Campo Color primario no se puede dejar vacio'})
    @IsString()
    colorUno: string;

    @IsNotEmpty({message: 'Campo cColor no se puede dejar vacio'})
    @IsString()
    colorDos: string;

    @IsNotEmpty({message: 'Campo Modelo no se puede dejar vacio'})
    @IsString()
    nombreModelo: string;

    @IsNotEmpty({message: 'Campo Año no se puede dejar vacio'})
    @IsNumber()
    anio: number;

    @IsNotEmpty()
    @IsNumber()
    idUsuario: number;



}

/*
<div>
                    <form action="/conductor/crear-conductor/" method="GET">
                        <button class="btn btn-outline-primary btn-block"
                                type="submit">
                            Crear conductor
                        </button>
                    </form>
                </div>
 */