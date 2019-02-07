import {Controller, Get, Query, Res, Param, Post, Body} from "@nestjs/common";
import { EventoPorConductorService } from "./evento-por-conductor.service";
import {EventoService} from "../evento/evento.service";
import {FindManyOptions, Like} from "typeorm";
import {EventoPorConductorEntity} from "./evento-por-conductor.entity";
import {ConductorService} from "../conductor/conductor.service";
import {EventoEntity} from "../evento/evento.entity";
import {CreateEventoPorConductorDto} from "./dto/create-evento-por-conductor.dto";
import {validate, ValidationError} from "class-validator";


@Controller('evento-por-conductor')

export class EventoPorConductorController{

    constructor(
        private readonly _eventoPorConductor: EventoPorConductorService,
        private readonly _eventoService: EventoService,
        private readonly _conductor: ConductorService
    ){}


    //PUBLICO
    @Get('inicio-publico')
    async inicioPublico(
        @Res() response,
        @Query('busqueda') busqueda,

    ){

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
            'mostrar-eventos-publico',
            {
                arreglo: eventos
            }
        )

    }

    @Get('listar-evento-publico/:idEvento')
    async listarEventoPublico(
        @Res() response,
        @Param('idEvento') idEvento,
        
    ){
        let eventosConductores: EventoPorConductorEntity[];
        
        if(idEvento){
            const consulta: FindManyOptions<EventoPorConductorEntity> = {
                where: [
                    {
                        idEvento: Like(`${+idEvento}`)
                    }
                ]
            };
            eventosConductores = await this._eventoPorConductor.buscar(consulta)

            let idConductores = [];

            eventosConductores.forEach(
                (conductor)=>{
                    idConductores.push(conductor.idConductor)
                }
            )
            const conductores = await this._conductor.buscarPorIDS(idConductores)
            
            response.render(
                'listar-eventos-publico',
                {
                    arreglo: conductores
                }
            )
        } else{
            const eventos = await this._eventoService.buscar()
            response.render(
                'mostrar-eventos-publico',
                {
                    arreglo: eventos
                }
            )
        }

        

    }

    @Post('crear-evento-por-conductor')
    async crearEventoPorConductor(
        @Res() response,
        @Body() eventoConductor: EventoPorConductor
    ){
        const validar = new CreateEventoPorConductorDto();
        console.log(typeof (eventoConductor.idConductor)+" "+ typeof (eventoConductor.idEvento))

        eventoConductor.idConductor = + eventoConductor.idConductor
        validar.idConductor = eventoConductor.idConductor;

        eventoConductor.idEvento = + eventoConductor.idEvento;
        validar.idEvento = eventoConductor.idEvento

        const errores: ValidationError[] = await validate(validar);
        const mensajeError = errores[0];
        const  hayErrores = errores.length >0;
        console.log("numeroerrores: "+errores.length);
        const listaError = [];
        console.log(errores)
        errores.forEach(
            (error) => {
                listaError.push(error.constraints)
                console.log(error)
            }
        );

        if(hayErrores){
            //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})
            const parametrosConsulta = `?error=${
                listaError.toString()
                }`;

            //response.redirect('/evento/crear-evento/'+parametrosConsulta)
        }else{
            await this._eventoPorConductor.crear(eventoConductor)

        }

    }


    @Post('add-conductor/:idConductor')
    async aniadirConductor(
        @Res() response,
        @Body() nombreEvento: string,
        @Param('idConductor') idConductor: string
    ){
        const eventoConductor: EventoPorConductor= null;
        const validar = new CreateEventoPorConductorDto();
        const idEvento = await this._eventoService.buscarPorNombre(nombreEvento)
        console.log(typeof (idConductor)+" "+ typeof (idEvento))

        eventoConductor.idConductor = + idConductor
        validar.idConductor = +idConductor;

        eventoConductor.idEvento = Number(idEvento);
        validar.idEvento = +idEvento

        const errores: ValidationError[] = await validate(validar);
        const  hayErrores = errores.length >0;
        console.log("numeroerrores: "+errores.length);
        const listaError = [];
        console.log(errores)
        errores.forEach(
            (error) => {
                listaError.push(error.constraints)
                console.log(error)
            }
        );

        if(hayErrores){
            const parametrosConsulta = `?error=${
                listaError.toString()
                }`;

            response.redirect('/conductor/crear-conductor/'+parametrosConsulta)
        }else{
            await this._eventoPorConductor.crear(eventoConductor)

        }

    }

}

export interface EventoPorConductor {
    idEventoPorConductor?: number,
    idConductor?: number,
    idEvento: number

}