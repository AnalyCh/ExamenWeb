import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    ForbiddenException,
    Param,
    BadRequestException,
    Session, Query,
} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import {UsuarioService} from './usuario.service';
import {Like} from 'typeorm';
import {validate, ValidationError} from 'class-validator';
import {UsuarioDto} from './usuario-create-dto/usuario-create.dto';

@Controller('usuario')

export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    @Get('crear-usuario')
    crearUsuario(
        @Res() response,
        @Query('mensaje') mensaje: string,
    ) {

        if (mensaje) {
            response.render(
                'crear-usuario', {
                    mensaje: mensaje,
                }
            )
        }
        else {
            response.render(
                'crear-usuario'
            )
        }
    }

    @Post('crear-usuario')
    async crearUsuarioPost(
        @Res() response,
        @Body() usuarioCrear,
    ) {
        const usuario = new UsuarioDto;
        usuario.nombre_usuario = usuarioCrear.nombre;
        usuario.email_usuario = usuarioCrear.email;
        usuario.password_usuario = usuarioCrear.password;
        usuario.fecha_nacimiento_usuario = usuarioCrear.fecha_nacimiento;
        const arregloErrores = await validate(usuario);
        const existeErrores = arregloErrores.length > 0;
        if (existeErrores) {
            console.error('Errores: Usuario a crear - ', arregloErrores);
            response.render('crear-usuario', {mensaje: 'Datos incorrectos'});
        } else {
            await this._usuarioService.crearUsuario(usuario);
            response.redirect('/login');
        }

    }

    @Get('inicio')
    async mostrarUsuario(
        @Res() res,
        @Session() sesion,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string
    ) {
        if (sesion.rol === 'administrador') {
            let mensaje = undefined;

            let usuarios: UsuarioEntity[];

            if (busqueda) {

                const consulta: FindManyOptions<UsuarioEntity> = {
                    where: [
                        {
                            nombre_usuario: Like(`%${busqueda}%`)
                        },
                        {
                            email_usuario: Like(`%${busqueda}%`)
                        },
                    ]
                };

                usuarios = await this._usuarioService.buscar(consulta);
            } else {

                usuarios = await this._usuarioService.buscar();
            }

            res.render('lista-usuarios',
                {
                    arregloUsuario: usuarios,
                    mensaje: mensaje,

                })
        } else {
            throw new BadRequestException({mensaje: "No hay permisos aun"});
        }
    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
    ) {


        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre_usuario}`;
        response.redirect('/usuario/inicio' + parametrosConsulta);


    }
}