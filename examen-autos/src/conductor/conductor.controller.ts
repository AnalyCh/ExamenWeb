import { Controller, Get, Res, Query, Post, Body, Param} from "@nestjs/common";
import { ConductorService } from "./conductor.service";
import { ConductorEntity } from "./conductor.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateConductorDto } from "./dto/create-conductor.dto";
import { ValidationError, validate } from "class-validator";

@Controller('conductor')
export class ConductorController{
    constructor(private readonly _conductorService: ConductorService){}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda,
        @Query('accion') accion:string,
        @Query('nombre') nombre: string
    ){
        let mensaje= undefined;
        let clase = undefined;
        if(accion &&nombre ){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado`;
                    clase = 'alert alert-info';
                    break;
                case 'crear':
                    mensaje = `Registro ${nombre} creado`;
                    clase = 'alert alert-success';
                    break;
            }
        }
        let conductores: ConductorEntity[];
        if(busqueda){
            const consulta: FindManyOptions<ConductorEntity> = {
                where: [
                    {
                        nombre: Like(`%${busqueda}`)
                    },
                    {
                        apellido: Like(`%${busqueda}`)
                    }
                ]
            };
            conductores = await this._conductorService.buscar(consulta);
        } else{
            conductores = await this._conductorService.buscar();
        }

        response.render(
            'inicio-conductores',
            {
                arreglo: conductores,
                mensaje: mensaje,
                booleano: false,
                clase: clase
            }
        )

    }

    @Get('crear-conductor')
    crearConductorRuta(
        @Res() response,
        @Query() error
    ){
        let mensaje= undefined;
        let clase = undefined;
        if(error ){
            mensaje = `No se creo el conductor.  ${error} `;
            clase = 'alert alert-danger';
        }
        response.render(
            'crear-conductor',
            {titulo: 'Crear conductor',
            mensaje: mensaje,
            clase: clase
        
        }
        )
    }

    @Post('crear-conductor')
    async crearConductor(
        @Res() response,
        @Body() conductor: Conductor
    ){

        
        const validarConductor = new CreateConductorDto();

        console.log(typeof(conductor.nombre)  +
            " \n"+ typeof(conductor.apellido)+ 
            "\n" + typeof(conductor.fechaDeNacimiento) + 
            " "+ typeof(conductor.licenciaValida) );


        validarConductor.nombre = conductor.nombre;
        validarConductor.apellido = conductor.apellido;
        const fec = new Date(conductor.fechaDeNacimiento).toISOString();
        //const fec: Date= Date.parse(conductor.fechaDeNacimiento.toString());
        validarConductor.fechaDeNacimiento = fec;
        conductor.licenciaValida = Boolean(Number(conductor.licenciaValida));
        validarConductor.licenciaValida = conductor.licenciaValida;

        console.log(conductor.nombre +
             " \n"+ conductor.apellido+ 
             "\n" + conductor.fechaDeNacimiento+ 
             " "+ conductor.licenciaValida);

        const errores: ValidationError[] = await validate(validarConductor);
        const mensajeError = errores[0];
        const  hayErrores = errores.length >0;
        console.log("numeroerrores: "+errores.length);

        if(hayErrores){
            //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})
            const parametrosConsulta = `?error=${
                errores.toString()
            }`;
            
            response.redirect('/conductor/crear-conductor/:'+parametrosConsulta)
        }else{
            await this._conductorService.crear(conductor);
            const parametrosConsulta = `?accion=crear&nombre=${
                conductor.nombre
            }`;
            
            response.redirect('/conductor/inicio'+parametrosConsulta)
        }

        
    }

    @Get('actualizar-conductor/:idConductor')
    async actualizarConductorVista(
        @Res() response,
        @Query() error,
        @Param('idConductor') idConductor: string
    ){
        const conductorEncontrado = await this._conductorService
        .buscarPorId(+idConductor);

        response.render(
            'crear-conductor',
            {
                conductor: conductorEncontrado
            }
        )
    }


    @Post('actualizar-conductor/:idConductor')
    async actualizarConductorMetodo(
        @Res() response,
        @Param('idConductor') idConductor: string,
        @Body() conductor: Conductor
    ){
        const validarConductor = new CreateConductorDto();

        validarConductor.nombre = conductor.nombre;
        validarConductor.apellido = conductor.apellido;
        const fec = new Date(conductor.fechaDeNacimiento).toISOString();
        //const fec: Date= Date.parse(conductor.fechaDeNacimiento.toString());
        validarConductor.fechaDeNacimiento = fec;
        conductor.licenciaValida = Boolean(Number(conductor.licenciaValida));
        validarConductor.licenciaValida = conductor.licenciaValida;

        console.log(conductor.nombre +
            " \n"+ conductor.apellido+
            "\n" + conductor.fechaDeNacimiento+
            " "+ conductor.licenciaValida);
        const errores: ValidationError[] = await validate(validarConductor);
        const mensajeError = errores.toString;
        const  hayErrores = errores.length >0;
        console.log("numero errores" + errores.length);
        if(hayErrores){
            console.log(errores);
            //throw new BadRequestException({mensaje: 'Error de validación en actualizar', error: "mensaje"})

            const parametrosConsulta = `?error=${
                errores
            }`;
            
            response.redirect('/conductor/actualizar-conductor/:'+idConductor+parametrosConsulta)
        }else{
            conductor.idConductor = +idConductor;
            await this._conductorService.actualizar(conductor);
                const parametrosConsulta = `?accion=actualizar&nombre=${
                    conductor.nombre
                }`;
                
                response.redirect('/conductor/inicio'+parametrosConsulta)
            }
       
    };

    @Post('eliminar/:idConductor')
    async eliminar(
        @Res() response,
        @Param('idConductor') idConductor: string
    ){
        const auto = await this._conductorService.buscarPorId(+idConductor);
        await this._conductorService
        .eliminar(+idConductor);

        const parametrosConsulta = `?accion=borrar&nombre=${
            auto.nombre
        }`;
        response.redirect('/conductor/inicio'+ parametrosConsulta)
        
    }

}

export interface Conductor{
    idConductor?: number,
    nombre?: string,
    apellido?: string,
    fechaDeNacimiento?:  Date,
    licenciaValida?: boolean,
}