import {Controller, Get, Res, Param, Session, Post, Body, BadRequestException, Query} from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import { stringify } from "querystring";
import { RolEntity } from "src/rol/rol.entity";
import { RolService } from "src/rol/rol.service";
import {RolPorUsuarioEntity} from "./rolPorUsuario.entity";
import {RolPorUsuarioService} from "./rolPorUsuario.service";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Controller('rol-por-usuario')

export class RolPorUsuarioController {
    constructor(
        private readonly _rolPorUsuarioService:RolPorUsuarioService,
        private readonly _usuarioService: UsuarioService,
        private readonly _rolService: RolService
    ){

    }

    @Get('asignar-rol/:idUsuario')
    async mostrarAsignarRol(
        @Res() response,
        @Param('idUsuario') idUsuario,
        @Query('verificacion')verificacion,
        @Query('')rol,
        @Session() sesion
    ){
        if(sesion.rol==='administrador') {
            let mensaje = undefined
            if(verificacion){
                mensaje = `El rol ${verificacion} ya existe`;
            }
            let usuarioRoles: RolPorUsuarioEntity[];
            const usuarioActualizar = await this._usuarioService.buscarPorId(+idUsuario)
            usuarioRoles = await this._rolPorUsuarioService.obtenerRoles(+idUsuario)
            const opcionesRoles = await this._rolService.obtenerRol();
            response.render('asignar-roles', {usuario: usuarioActualizar, rolUsuario: usuarioRoles, opcionesRoles, mensaje})
        }else{
            throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
        }
    }

    @Post('asignar-rol/:idUsuario')
    async asginarRol(
        @Body()rol:RolPorUsuarioInterface,
        @Res() response,
        @Param('idUsuario') idUsuario,
        @Session() sesion
    ){

        rol.usuario = idUsuario
        const verificarRolesUsuario = await this._rolPorUsuarioService.verificarRoles(rol)
        if(verificarRolesUsuario){
            const parametrosConsulta = `?verificacion=${
                verificarRolesUsuario.rol.rol_nombre}`;
            response.redirect('/rol-por-usuario/asignar-rol/'+idUsuario+parametrosConsulta)
        }else{

            await this._rolPorUsuarioService.asignarRol(rol)
            response.redirect('/rol-por-usuario/asignar-rol/'+idUsuario)

        }

    }


    @Post('borrar/:idRolUsuario')
    async borrar(
        @Param('idRolUsuario') idRolUsuario,
        @Res() response
    ) {
        const rolUsuarioEncontrado = await this._rolPorUsuarioService
            .buscarPorId(+idRolUsuario);

        await this._rolPorUsuarioService.borrar(Number(idRolUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${rolUsuarioEncontrado.id}`;

        response.redirect('/rol-por-usuario/asignar-rol/'+rolUsuarioEncontrado.usuario.id);
    }

}


export interface RolPorUsuarioInterface
{
    id?:number,
    rol:RolEntity,
    usuario: UsuarioEntity,
}