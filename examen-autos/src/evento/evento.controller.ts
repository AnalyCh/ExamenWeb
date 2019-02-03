import { Controller, Get, Res, Query, Body, Post, BadRequestException, Param } from "@nestjs/common";
import { EventoService } from "./evento.service";
import { EventoEntity } from "./evento.entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { ValidationError, validate } from "class-validator";


@Controller('evento')
export class EventoController{

    constructor(
        private readonly _eventoService: EventoService
    ){}

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
        let eventos: EventoEntity[];
        if(busqueda){
            const consulta: FindManyOptions<EventoEntity> = {
                where: [
                    {
                        nombre: Like(`%${busqueda}`)
                    },
                    {
                        fecha: Like(`%${busqueda}`)
                    },
                    {
                        latitud: Like(`%${busqueda}`)
                    },
                    {
                        longitud: Like(`%${busqueda}`)
                    }
                ]
            };
            eventos = await this._eventoService.buscar(consulta);
        } else{
            eventos = await this._eventoService.buscar();
        }

        response.render(
            'inicio-eventos',
            {
                arreglo: eventos,
                mensaje: mensaje,
                booleano: false,
                clase: clase
            }
        )

    }

    @Get('crear-evento')
    crearEventoRuta(
        @Res() response
    ){
        response.render(
            'crear-evento',
            {titulo: 'Crear evento'}
        )
    }

    @Post('crear-evento')
    async crearEvento(
        @Res() response,
        @Body() evento: Evento
    ){
        const validarEvento = new CreateEventoDto();

        validarEvento.nombre = evento.nombre;
        validarEvento.fecha = evento.fecha;
        validarEvento.latitud = evento.latitud;
        validarEvento.longitud = evento.longitud;
        const errores: ValidationError[] = await validate(validarEvento);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
        }else{
            await this._eventoService.crear(evento);
            const parametrosConsulta = `?accion=crear&nombre=${
                evento.nombre
            }`;
            
            response.redirect('/evento/inicio'+parametrosConsulta)
        }

        
    }

    @Get('actualizar-evento/:idEvento')
    async actualizareventoVista(
        @Res() response,
        @Param('idEvento') idEvento: string
    ){
        const eventoEncontrado = await this._eventoService
        .buscarPorId(+idEvento);

        response.render(
            'crear-evento',
            {
                evento: eventoEncontrado
            }
        )
    }


    @Post('actualizar-evento/:idEvento')
    async actualizareventoMetodo(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Body() evento: Evento
    ){
        const validarEvento = new CreateEventoDto();

        validarEvento.nombre = evento.nombre;
        validarEvento.fecha = evento.fecha;
        validarEvento.latitud = evento.latitud;
        validarEvento.longitud = evento.longitud;
        const errores: ValidationError[] = await validate(validarEvento);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
        }else{
            evento.idEvento = +idEvento;
            await this._eventoService.actualizar(evento);
                const parametrosConsulta = `?accion=actualizar&nombre=${
                    evento.nombre
                }`;
                
                response.redirect('/evento/inicio'+parametrosConsulta)
            }
       
    };

    @Post('eliminar/:idEvento')
    async eliminar(
        @Res() response,
        @Param('idEvento') idEvento: string
    ){
        const evento = await this._eventoService.buscarPorId(+idEvento);
        await this._eventoService
        .eliminar(+idEvento);

        const parametrosConsulta = `?accion=borrar&nombre=${
            evento.nombre
        }`;
        response.redirect('/evento/inicio'+ parametrosConsulta)
        
    }

}

export interface Evento {
    idEvento?: number,
    nombre?: string,
    fecha?: Date,
    latitud?: string,
    longitud?: string
}