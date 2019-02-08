import {BadRequestException, Body, Controller, Get, HttpCode, Post, Query, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from './usuario/usuario.service';
import {RolPorUsuarioService} from './rolPorUsuario/rolPorUsuario.service';
import {validate} from 'class-validator';
import {CredencialesDto} from './dto/credenciales.dto';
import {error} from 'util';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService,
                private readonly _rolPorUsuarioService: RolPorUsuarioService) {}

    @Get('login')
    credenciales(
        @Res() response,
        @Query('mensaje') mensaje: string,

    ) {
        if(mensaje){
            response.render(

                'login', {
                    mensaje: mensaje,
                }

            )
        }
        else {
            response.render('login');
        }


    }

    @Post('credenciales')
    async metodoCrendenciales(
        @Res() response,
        @Session() session,
        @Body('email_usuario') username_email,
        @Body('password') password,

    ) {
        let mensaje;

        console.log(username_email, password);
        const usuario = new CredencialesDto;
        usuario.email_usuario = username_email;
        usuario.password_usuario = password;
        const arregloErrores = await validate(usuario);
        const existeErrores = arregloErrores.length > 0;
        if (existeErrores) {

            response.render('login', {mensaje: 'Datos incorrectos'})


        } else {
            const respuestaAutenticacion = await this._usuarioService.credenciales(usuario);

            if (respuestaAutenticacion){
                const idUsuario = respuestaAutenticacion.id;
                const rolUsuario = await this._rolPorUsuarioService.verificarRol(+idUsuario);
                if (rolUsuario){
                    const nombreRol = rolUsuario.rol.rol_nombre;
                    session.rol = nombreRol;
                    session.username_email = username_email;
                    session.idUsuario = idUsuario;

                    switch (nombreRol) {
                        case 'usuario':
                            response.redirect('/usuario/crear-usuario');
                            break;
                        case 'administrador':
                            response.redirect('/usuario/inicio');
                            break;
                        default:

                            response.render('login');

                    }
                }else{

//                    response.render('login', {mensaje: 'Datos incorrectos'})
                  // throw new BadRequestException({mensaje: 'No tiene permisos aunfddf'}); response.render('crear-usuario', {mensaje: 'Datos incorrectos'});

                }
            }  else{
             //   response.render('login', {mensaje: 'Datos incorrectos'})
              // response.render('login')
              //  response.redirect('login?errores=Hay errores');
              throw new BadRequestException({mensaje: 'No a tiene permisos aun'});

            }

        }

    }

    @Get('logout')
    async logout(
        @Res() res,
        @Session() sesion,
    )
    {
        sesion.usuario = undefined;
        sesion.destroy();
        res.render('login');
    }

}