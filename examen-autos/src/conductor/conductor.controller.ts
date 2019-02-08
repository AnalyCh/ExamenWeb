import {Controller, Get, Res, Query, Post, Body, Param, Session} from "@nestjs/common";
import { ConductorService } from "./conductor.service";
import { ConductorEntity } from "./conductor.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateConductorDto } from "./dto/create-conductor.dto";
import { ValidationError, validate } from "class-validator";
import {SSL_OP_NO_SSLv3} from "constants";
import {AutoEntity} from "../auto/auto.entity";
import {AutoService} from "../auto/auto.service";

@Controller('conductor')
export class ConductorController{
    constructor(
        private readonly _conductorService: ConductorService,
                private readonly  _autoService: AutoService
){}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda,
        @Query('accion') accion:string,
        @Query('nombre') nombre: string,
        @Session() session
    ){
        if(session.rol === "usuario"){
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
            const auto = await this._autoService.buscarPorIdSession(+session.idUsuario)
            let conductores: ConductorEntity[];
            if(busqueda){
                const consulta: FindManyOptions<ConductorEntity> = {
                    where: [
                        {
                            autos: auto.idAuto ,nombre: Like(`%${busqueda}`)
                        },
                        {
                            autos: auto.idAuto, apellido: Like(`%${busqueda}`)
                        }
                    ]
                };
                conductores = await this._conductorService.buscar(consulta);
            } else{
                const auto = await this._autoService.buscarPorIdSession(+session.idUsuario)
                const consulta: FindManyOptions<ConductorEntity> = {
                    where: [
                        {
                            autos: auto.idAuto
                        }
                    ]
                };
                conductores = await this._conductorService.buscar(consulta);
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


    }

    @Get('crear-conductor')
    async crearConductorRuta(
        @Res() response,
        @Query('error') error,
        @Session() session
    ){

        let autos: AutoEntity[];
        const consultaGe: FindManyOptions<AutoEntity> = {
            where:
                {
                    idUsuario: session.idUsuario
                }

        };
        autos = await this._autoService.buscar(consultaGe);
        if(session.rol ==="usuario"){
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
                    clase: clase,
                    arregloAutos: autos

                }
            )
        }

    }

    @Post('crear-conductor')
    async crearConductor(
        @Res() response,
        @Body() conductor: Conductor,
        @Session() session
    ){
        if(session.rol === "usuario"){
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
            conductor.autos = Number( conductor.autos);

            console.log(conductor.nombre +
                " \n"+ conductor.apellido+
                "\n" + conductor.fechaDeNacimiento+
                " "+ conductor.licenciaValida);

            const errores: ValidationError[] = await validate(validarConductor);
            const mensajeError = errores[0];
            const  hayErrores = errores.length >0;
            console.log("numeroerrores: "+errores.length);
            const listaError = [];
            console.log(errores);
            errores.forEach(
                (error) => {
                    listaError.push(error.property);
                    console.log(error.property)
                }
            );

            if(hayErrores){
                //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})
                const parametrosConsulta = `?error=${
                    listaError.toString()
                    }`;

                response.redirect('/conductor/crear-conductor/'+parametrosConsulta)
            }else{
                await this._conductorService.crear(conductor);
                const parametrosConsulta = `?accion=crear&nombre=${
                    conductor.nombre
                    }`;

                response.redirect('/conductor/inicio'+parametrosConsulta)
            }
        }

        
    }

    @Get('actualizar-conductor/:idConductor')
    async actualizarConductorVista(
        @Res() response,
        @Query('error') error,
        @Param('idConductor') idConductor: string,
        @Session() session
    ){
        let autos: AutoEntity[];
        const consultaGe: FindManyOptions<AutoEntity> = {
            where:
                {
                    idUsuario: session.idUsuario
                }

        };
        autos = await this._autoService.buscar(consultaGe);
        if(session.rol ==="usuario"){
            const conductorEncontrado = await this._conductorService
                .buscarPorId(+idConductor);

            response.render(
                'crear-conductor',
                {
                    conductor: conductorEncontrado,
                    arregloAutos: autos
                }
            )
        }

    }


    @Post('actualizar-conductor/:idConductor')
    async actualizarConductorMetodo(
        @Res() response,
        @Param('idConductor') idConductor: string,
        @Body() conductor: Conductor,
        @Session() session
    ){
        if(session.rol ==="usuario"){
            const validarConductor = new CreateConductorDto();

            validarConductor.nombre = conductor.nombre;
            validarConductor.apellido = conductor.apellido;
            const fec = new Date(conductor.fechaDeNacimiento).toISOString();
            //const fec: Date= Date.parse(conductor.fechaDeNacimiento.toString());
            validarConductor.fechaDeNacimiento = fec;
            conductor.licenciaValida = Boolean(Number(conductor.licenciaValida));
            validarConductor.licenciaValida = conductor.licenciaValida;
            conductor.autos = Number(conductor.autos);

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
        }

       
    };

    @Post('eliminar/:idConductor')
    async eliminar(
        @Res() response,
        @Param('idConductor') idConductor: string,
        @Session() session
    ){
        if(session.rol ==="usuario"){
            const auto = await this._conductorService.buscarPorId(+idConductor);
            await this._conductorService
                .eliminar(+idConductor);

            const parametrosConsulta = `?accion=borrar&nombre=${
                auto.nombre
                }`;
            response.redirect('/conductor/inicio'+ parametrosConsulta)
        }

        
    }




}

export interface Conductor{
    idConductor?: number,
    nombre?: string,
    apellido?: string,
    fechaDeNacimiento?:  Date,
    licenciaValida?: boolean,
    autos?: number,
}