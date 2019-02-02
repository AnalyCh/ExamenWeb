import {Controller, Get, Res, Query, Post, Body, BadGatewayException, BadRequestException, Param} from "@nestjs/common";
import { SrvRecord } from "dns";
import { AutoService } from "./auto.service";
import { async } from "rxjs/internal/scheduler/async";
import { response } from "express";
import { AutoEntity } from "./auto-entity";
import { FindManyOptions, Like } from "typeorm";
import { CreateAutoDto } from "./dto/create-auto.dto";
import { ValidationError, validate } from "class-validator";


@Controller('auto')
export class AutoController {

    constructor(private readonly _autoService: AutoService){}

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
    crearAutoRuta(
        @Res() response
    ){
        response.render(
            'crear-auto',
            {titulo: 'Crear auto'}
        )
    }

    @Post('crear-auto')
    async crearAuto(
        @Res() response,
        @Body() auto: Auto
    ){
        const objetoValidacionAuto = new CreateAutoDto();
        objetoValidacionAuto.chasis = auto.chasis;
        objetoValidacionAuto.nombreMarca = auto.nombreMarca;
        objetoValidacionAuto.colorUno = auto.colorUno;
        objetoValidacionAuto.colorDos = auto.colorDos;
        objetoValidacionAuto.nombreModelo = auto.nombreModelo;
        objetoValidacionAuto.anio = auto.anio;

        const errores: ValidationError[] = await validate(objetoValidacionAuto);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
        }else{
            await this._autoService.crear(auto);
            const parametrosConsulta = `?accion=crear&nombreMarca=$${
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

        response.render(
            'crear-auto',
            {
                auto: autoEncontrado
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
        objetoValidacionAuto.chasis = auto.chasis;
        objetoValidacionAuto.nombreMarca = auto.nombreMarca;
        objetoValidacionAuto.colorUno = auto.colorUno;
        objetoValidacionAuto.colorDos = auto.colorDos;
        objetoValidacionAuto.nombreModelo = auto.nombreModelo;
        objetoValidacionAuto.anio = auto.anio;

        const errores: ValidationError[] = await validate(objetoValidacionAuto);
        const  hayErrores = errores.length >0;

        if(hayErrores){
            throw new BadRequestException({mensaje: 'Error de validación en crear'})
        }else{
            await this._autoService.actualizar(auto);
            const parametrosConsulta = `?accion=actualizar&nombreMarca=$${
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

        const parametrosConsulta = `?accion=borrar&nombreMarca=$${
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