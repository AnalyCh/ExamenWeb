import { Controller, Get, Res, Query, Post, Body, Param, BadRequestException } from "@nestjs/common";
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
        @Res() response
    ){
        response.render(
            'crear-conductor',
            {titulo: 'Crear conductor'}
        )
    }

    @Post('crear-conductor')
    async crearConductor(
        @Res() response,
        @Body() conductor: Conductor
    ){
        const validarConductor = new CreateConductorDto();

        validarConductor.nombre = conductor.nombre;
        validarConductor.apellido = conductor.apellido;
        validarConductor.fechaDeNacimiento = conductor.fechaDeNacimiento;
        validarConductor.licenciaValida = conductor.licenciaValida;

        const errores: ValidationError[] = await validate(validarConductor);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
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
        @Param('idConductor') idConductor: string
    ){
        const conductorEncontrado = await this._conductorService
        .buscarPorId(+idConductor);

        response.render(
            'crear-conductor',
            {
                auto: conductorEncontrado
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
        validarConductor.fechaDeNacimiento = conductor.fechaDeNacimiento;
        validarConductor.licenciaValida = conductor.licenciaValida;

        const errores: ValidationError[] = await validate(validarConductor);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
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
    fechaDeNacimiento?: Date,
    licenciaValida?: boolean,
}