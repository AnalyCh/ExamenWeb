import {Controller, Get, Res, Query, Post, Body, BadGatewayException, BadRequestException, Param} from "@nestjs/common";
import { SrvRecord } from "dns";
import { AutoService } from "./auto.service";
import { async } from "rxjs/internal/scheduler/async";
import { response } from "express";
import { AutoEntity } from "./auto-entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateAutoDto } from "./dto/create-auto.dto";
import { ValidationError, validate } from "class-validator";
import { ConductorEntity } from "src/conductor/conductor.entity";
import { ConductorService } from "src/conductor/conductor.service";


@Controller('auto')
export class AutoController {

    constructor(private readonly _autoService: AutoService,
                private readonly _conductorService: ConductorService){}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda,
        @Query('accion') accion:string,
        @Query('marca') marca: string
    ){
        let mensaje= undefined;
        let clase = undefined;
        if(accion &&marca ){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${marca} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${marca} actualizado`;
                    clase = 'alert alert-info';
                    break;
                case 'crear':
                    mensaje = `Registro ${marca} creado`;
                    clase = 'alert alert-success';
                    break;
            }
        }
        let autos: AutoEntity[];
        if(busqueda){
            const consulta: FindManyOptions<AutoEntity> = {
                where: [
                    {
                        marca: Like(`%${busqueda}`)
                    },
                    {
                        nombreModelo: Like(`%${busqueda}`)
                    },
                    {
                        anio: Like(`%${busqueda}`)
                    }
                ]
            };
            autos = await this._autoService.buscar(consulta);
        } else{
            autos = await this._autoService.buscar();
        }

        response.render(
            'inicio-autos',
            {
                arreglo: autos,
                mensaje: mensaje,
                booleano: false,
                clase: clase
            }
        )

    }

    @Get('crear-auto')
    async crearAutoRuta(
        @Res() response
    ){
        let conductores: ConductorEntity[];
        conductores = await this._conductorService.buscar();
        response.render(
            'crear-auto',
            {
                titulo: 'Crear auto',
                arregloConductores: conductores
        
            }
        )
    }

    @Post('crear-auto')
    async crearAuto(
        @Res() response,
        @Body() auto: Auto
    ){
        const objetoValidacionAuto = new CreateAutoDto();
        
        const num = Number(auto.chasis)

        objetoValidacionAuto.chasis = num;
        objetoValidacionAuto.nombreMarca = auto.nombreMarca;
        objetoValidacionAuto.colorUno = auto.colorUno;
        objetoValidacionAuto.colorDos = auto.colorDos;
        objetoValidacionAuto.nombreModelo = auto.nombreModelo;
        const anioNum = Number(auto.anio);
        objetoValidacionAuto.anio = anioNum;

        const errores: ValidationError[] = await validate(objetoValidacionAuto);
        const  hayErrores = errores.length >0;
        console.log("numero de errores: "+errores.length)
        const mensajeError = errores[0]
        

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})
        }else{
            await this._autoService.crear(auto);
            const parametrosConsulta = `?accion=crear&nombreMarca=${
                auto.nombreMarca
            }`;
            
            response.redirect('/auto/inicio'+parametrosConsulta)
        }
    }

    @Get('actualizar-auto/:idAuto')
    async actualizarAutoVista(
        @Res() response,
        @Param('idAuto') idAuto: string
    ){
        const autoEncontrado = await this._autoService
        .buscarPorId(+idAuto);

        console.log(autoEncontrado.idAuto + " "+ autoEncontrado.chasis)

        let conductores: ConductorEntity[];
        conductores = await this._conductorService.buscar();
        response.render(
            'crear-auto',
            {
                auto: autoEncontrado,
                arregloConductores: conductores
            }
        )
    }

    @Post('actualizar-auto/:idAuto')
    async actualizarAutoMetodo(
        @Res() response,
        @Param('idAuto') idAuto: string,
        @Body() auto: Auto
    ){
        auto.idAuto = +idAuto;
        //
        const objetoValidacionAuto = new CreateAutoDto();

        const num = Number(auto.chasis)

        objetoValidacionAuto.chasis = num;
        objetoValidacionAuto.chasis = auto.chasis;
        objetoValidacionAuto.nombreMarca = auto.nombreMarca;
        objetoValidacionAuto.colorUno = auto.colorUno;
        objetoValidacionAuto.colorDos = auto.colorDos;
        objetoValidacionAuto.nombreModelo = auto.nombreModelo;

        const anioNum = Number(auto.anio);
        objetoValidacionAuto.anio = anioNum;

        const errores: ValidationError[] = await validate(objetoValidacionAuto);
        const  hayErrores = errores.length >0;
        const mensajeError = errores[0]
        console.log("error: "+mensajeError)
        console.log("error: "+errores.length)

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en actualizar', error: mensajeError})
        }else{
            await this._autoService.actualizar(auto);
            const parametrosConsulta = `?accion=actualizar&nombreMarca=${
                auto.nombreMarca
            }`;
            
            response.redirect('/auto/inicio'+parametrosConsulta)
        }
    };

    @Post('eliminar/:idAuto')
    async eliminar(
        @Res() response,
        @Param('idAuto') idAuto: string
    ){
        const auto = await this._autoService.buscarPorId(+idAuto);
        await this._autoService
        .eliminar(+idAuto);

        const parametrosConsulta = `?accion=borrar&nombreMarca=${
            auto.nombreMarca
        }`;
        response.redirect('/auto/inicio'+ parametrosConsulta)
        
    }




}

export interface Auto{
    idAuto?: number,
    chasis?: number,
    nombreMarca?: string,
    colorUno?: string,
    colorDos?: string,
    nombreModelo?: string,
    anio?: number,
    idConductor?: number
}

// value="<%=conductor.id %>"  // "<%= estaCreando ? "<%=conductor.id %>": auto.idConductor %>" 