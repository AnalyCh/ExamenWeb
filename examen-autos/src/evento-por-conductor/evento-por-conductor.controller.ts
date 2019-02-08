import {Controller, Get, Query, Res, Param, Post, Body} from "@nestjs/common";
import { EventoPorConductorService } from "./evento-por-conductor.service";
import {EventoService} from "../evento/evento.service";
import {FindManyOptions, FindOneOptions, Like} from "typeorm";
import {EventoPorConductorEntity} from "./evento-por-conductor.entity";
import {ConductorService} from "../conductor/conductor.service";
import {EventoEntity} from "../evento/evento.entity";
import {CreateEventoPorConductorDto} from "./dto/create-evento-por-conductor.dto";
import {validate, ValidationError} from "class-validator";
import {ConductorEntity} from "../conductor/conductor.entity";


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
        let eventosConductores;
        
        if(idEvento){
            const consulta: FindManyOptions<EventoPorConductorEntity> = {
                where:
                    {
                        idEvento: idEvento
                    }

            };
            eventosConductores = await this._eventoPorConductor.buscar(consulta)

            eventosConductores.forEach((evento)=>{
                console.log(JSON.stringify(evento))
            })

            let idConductores=[];

            eventosConductores.forEach(
                (conductor)=>{
                    idConductores.push(conductor.idConductor)
                    console.log(conductor.idConductor)
                }
            );
            const conductores = await this._conductor.buscarPorIDS(idConductores);

            conductores.forEach((conductor)=>{
                console.log(conductor.idConductor)
            })
            
            response.render(
                'listar-evento-publico',
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



    //

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
        console.log(errores);
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

    @Get('lista-conductores/:idEvento')
    async addConductor(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }
        console.log(idEvento);
        const path =`/lista-conductores/:${idEvento}`;
        let conductoresEventoActual: ConductorEntity[];

        if(idEvento) {
            const consulta: FindManyOptions<EventoPorConductorEntity> = {
                where: [
                    {
                        idEvento: Like(`${+idEvento}`)
                    }
                ]
            };
            const eventosConductores = await this._eventoPorConductor.buscar(consulta);
            let idConductores = [];

            eventosConductores.forEach(
                (conductor)=>{
                    idConductores.push(conductor.idConductor)
                }
            );
            conductoresEventoActual = await this._conductor.buscarPorIDS(idConductores);
        }
        let conductores= await this._conductor.buscar();

        response.render(
            'add-conductores-a-evento',{
                arreglo: conductores,
                conductores: conductoresEventoActual,
                mensaje: mensaje,
                path: path,
                idEvento: idEvento,
                clase: clase,


            }
        )
    }

    @Get('lista-conductores/:idEvento/:idConductor')
    async addConductorEvento(
        @Res() response,
        @Param('idEvento') idEvento: string,
        @Query('error') error
    ){
        let mensaje = undefined;
        let clase = undefined;
        if(error ){
            mensaje = `Error en el compos ${error}`;
            clase = 'alert alert-danger';
        }
        console.log(idEvento);
        const path =`/lista-conductores/:${idEvento}`;
        let conductoresEventoActual: ConductorEntity[];


            const consulta: FindManyOptions<EventoPorConductorEntity> = {
                where: [
                    {
                        idEvento: Number(idEvento)
                    }
                ]
            };
            const eventosConductores = await this._eventoPorConductor.buscar(consulta);
            let idConductores = [];

            eventosConductores.forEach(
                (conductor)=>{
                    idConductores.push(conductor.idConductor)
                }
            );
            conductoresEventoActual = await this._conductor.buscarPorIDS(idConductores);

        let conductores= await this._conductor.buscar();

        response.render(
            'add-conductores-a-evento',{
                arreglo: conductores,
                conductores: conductoresEventoActual,
                mensaje: mensaje,
                path: path,
                idEvento: idEvento,
                clase: clase,


            }
        )
    }


    @Post('lista-conductores/:idEvento/:idConductor')
    async aniadirConductor(
        @Res() response,

        @Param('idEvento') idEvento: string,
        @Param('idConductor') idConductor: string
    ) {
        console.log(idEvento+ " -" + idConductor)

        //const eventoConductor: EventoPorConductor = await this._eventoPorConductor.crearUnEventoIntermedio(Number(idEvento), Number(idConductor))

        //let eventoConductor: EventoPorConductor = {idEvento: Number(idEvento), idConductor: Number(idConductor)};
        //console.log(eventoConductor.idConductor + " "+eventoConductor.idEvento)


        const validar = new CreateEventoPorConductorDto();

        validar.idConductor = Number(idConductor);
        validar.idEvento = Number(idEvento);

        const errores: ValidationError[] = await validate(validar);
        const hayErrores = errores.length > 0;
        console.log("numeroerrores: " + errores.length);
        const listaError = [];
        console.log(errores);
        errores.forEach(
            (error) => {
                listaError.push(error.constraints["isNumber"]);
                console.log(error)
            }
        );


        if (hayErrores) {
            const parametrosConsulta = `?error=${
                listaError.toString()
                }`;

            response.redirect('/evento-por-conductor/lista-conductores/' + parametrosConsulta)
        } else {
            const conductorEventoACrear =
                await this._eventoPorConductor.buscarSiExiste(Number(idEvento), Number(idConductor));



            if(conductorEventoACrear){
                console.log(conductorEventoACrear.idConductor)
                console.log('Si existe');
                await this._eventoPorConductor.eliminar(Number(idEvento));
                const parametrosConsulta = `?accion=eliminar`;

                response.redirect(''+parametrosConsulta);
            }else {

                console.log('no existe');
                await this._eventoPorConductor.crearUnEventoIntermedio(Number(idEvento), Number(idConductor));
                const parametrosConsulta = `?accion=crear`;
                response.redirect(''+parametrosConsulta);
            }



        }


    }

}

export interface EventoPorConductor {
    idEventoPorConductor?: number,
    idConductor?: number,
    idEvento: number

}