import {Controller, Get, Res, Query, Post, Body, BadRequestException, Param, Session} from "@nestjs/common";
import { AutoService } from "./auto.service";
import { AutoEntity } from "./auto.entity";
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
        @Query('marca') marca: string,
        @Session() session
    ){
        if(session.rol === 'usuario'){
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
                            idUsuario: session.idUsuario ,marca: Like(`%${busqueda}`)
                        },
                        {
                            idUsuario: session.idUsuario ,nombreModelo: Like(`%${busqueda}`)
                        },
                        {
                            idUsuario: session.idUsuario ,anio: Like(`%${busqueda}`)
                        }
                    ]
                };
                autos = await this._autoService.buscar(consulta);
            } else{
                const consultaGe: FindManyOptions<AutoEntity> = {
                where:
                    {
                        idUsuario: session.idUsuario
                    }

            };
                autos = await this._autoService.buscar(consultaGe);
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


    }

    @Get('crear-auto')
    async crearAutoRuta(
        @Res() response,
        @Query('error') error,
        @Session() session,
    ){
        if(session.rol === "usuario"){
            let mensaje = undefined;
            let clase = undefined;
            if(error ){
                mensaje = `Error en el compo/s ${error}`;
                clase = 'alert alert-danger';
            }


            let conductores: ConductorEntity[];
            conductores = await this._conductorService.buscar();
            response.render(
                'crear-auto',
                {
                    titulo: 'Crear auto',
                    mensaje: mensaje,
                    arregloConductores: conductores,
                    clase: clase

                }
            )
        }

    }

    @Post('crear-auto')
    async crearAuto(
        @Res() response,
        @Body() auto: Auto,
        @Session() session,
    ){
        if(session.rol === "usuario"){
            const objetoValidacionAuto = new CreateAutoDto();

            auto.chasis = Number(auto.chasis);

            objetoValidacionAuto.chasis = auto.chasis;
            objetoValidacionAuto.nombreMarca = auto.nombreMarca;
            objetoValidacionAuto.colorUno = auto.colorUno;
            objetoValidacionAuto.colorDos = auto.colorDos;
            objetoValidacionAuto.nombreModelo = auto.nombreModelo;
            auto.anio= Number(auto.anio);
            objetoValidacionAuto.anio = auto.anio;
            auto.idUsuario = + session.idUsuario;
            objetoValidacionAuto.idUsuario = auto.idUsuario;

            const errores: ValidationError[] = await validate(objetoValidacionAuto);
            const  hayErrores = errores.length >0;
            console.log("numero de errores en crear auto: "+errores.length);
            const mensajeError = errores[0];

            console.log(auto.nombreMarca+ "\n"+
                auto.colorUno +"\n");
            const listaError = [];
            console.log(errores)
            errores.forEach(
                (error) => {
                    listaError.push(error.constraints["isNotEmpty"])
                    console.log(error.property)
                }
            );

            if(hayErrores){
                //throw new BadRequestException({mensaje: 'Error de validación en crear', error: mensajeError})

                const parametrosConsulta = `?error=${
                    listaError.toString()
                    }`;

                response.redirect('/auto/crear-auto'+parametrosConsulta)


            }else{
                await this._autoService.crear(auto);
                const parametrosConsulta = `?accion=crear&nombreMarca=${
                    auto.nombreMarca
                    }`;

                response.redirect('/auto/inicio'+parametrosConsulta)
            }
        }

    }

    @Get('actualizar-auto/:idAuto')
    async actualizarAutoVista(
        @Res() response,
        @Param('idAuto') idAuto: string,
        @Session() session,
    ){
        if(session.rol === "usuario"){
            const autoEncontrado = await this._autoService
                .buscarPorId(+idAuto);

            console.log(autoEncontrado.idAuto + " "+ autoEncontrado.chasis);

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

    }

    @Post('actualizar-auto/:idAuto')
    async actualizarAutoMetodo(
        @Res() response,
        @Param('idAuto') idAuto: string,
        @Body() auto: Auto,
        @Session() session
    ){
        if(session.rol === 'usuario'){
            auto.idAuto = +idAuto;
            //
            const objetoValidacionAuto = new CreateAutoDto();

            auto.chasis = Number(auto.chasis);

            objetoValidacionAuto.chasis = auto.chasis;
            objetoValidacionAuto.nombreMarca = auto.nombreMarca;
            objetoValidacionAuto.colorUno = auto.colorUno;
            objetoValidacionAuto.colorDos = auto.colorDos;
            objetoValidacionAuto.nombreModelo = auto.nombreModelo;

            auto.anio = Number(auto.anio);
            objetoValidacionAuto.anio = auto.anio;

            const errores: ValidationError[] = await validate(objetoValidacionAuto);
            const  hayErrores = errores.length >0;
            const mensajeError = errores[0];
            console.log("error: "+mensajeError);
            console.log("error: "+errores.length);
            const listaError = [];
            console.log(errores);
            errores.forEach(
                (error) => {
                    listaError.push(error.property)
                    console.log(error.property)
                }
            );

            if(hayErrores){
                throw new BadRequestException({mensaje: 'Error de validación en actualizar', error: mensajeError})
            }else{
                // @ts-ignore
                await this._autoService.actualizar(auto);
                const parametrosConsulta = `?accion=actualizar&nombreMarca=${
                    auto.nombreMarca
                    }`;

                response.redirect('/auto/inicio'+parametrosConsulta)
            }
        }

    };

    @Post('eliminar/:idAuto')
    async eliminar(
        @Res() response,
        @Param('idAuto') idAuto: string,
        @Session() session
    ){
        if(session.rol  ==="usuario"){
            const auto = await this._autoService.buscarPorId(+idAuto);
            await this._autoService
                .eliminar(+idAuto);

            const parametrosConsulta = `?accion=borrar&nombreMarca=${
                auto.nombreMarca
                }`;
            response.redirect('/auto/inicio'+ parametrosConsulta)
        }

        
    };




    @Get('inicio-usuario')
    inicioGeneral(
        @Res() res,
        @Session() session
    ){
        if(session.rol === 'usuario'){
            res.render(
                'inicio-usuario'
            )
        }else{
            console.log("no usuario")
        }

    }




}

export interface Auto{
    idAuto: number,
    chasis: number,
    nombreMarca: string,
    colorUno: string,
    colorDos: string,
    nombreModelo: string,
    anio: number,
    idUsuario?: number

}

// value="<%=conductor.id %>"  // "<%= estaCreando ? "<%=conductor.id %>": auto.conductor %>" 