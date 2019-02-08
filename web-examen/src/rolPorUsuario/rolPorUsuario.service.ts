import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindOneOptions, FindManyOptions} from "typeorm";
import {RolPorUsuarioEntity} from "./rolPorUsuario.entity";
import {RolPorUsuarioInterface} from "./rolPorUsuario.controller";


@Injectable()
export class RolPorUsuarioService {
    constructor(
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioService: Repository<RolPorUsuarioEntity>){
    }


    async verificarRol(idUsuario: number): Promise<RolPorUsuarioEntity> {
        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,

            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioService.findOne(consulta);
    }



    async obtenerRoles(idUsuario: number): Promise<RolPorUsuarioEntity[]> {

        const consulta: FindManyOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,
            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioService.find(consulta);
    }

    borrar(id: number): Promise<RolPorUsuarioEntity> {
        const rolUsuarioEntityEliminar = this._rolPorUsuarioService.create({
            id: id
        });
        return this._rolPorUsuarioService.remove(rolUsuarioEntityEliminar)
    }


    async buscarPorId(idRolPorUsuario: number): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                id: idRolPorUsuario,

            },
            relations:['usuario']
        };
        return await this._rolPorUsuarioService.findOne(consulta);
    }


    async asignarRol(rolAsignar:RolPorUsuarioInterface): Promise<RolPorUsuarioEntity> {
        const respuestRolEntity = this._rolPorUsuarioService.create(rolAsignar);
        const rolAsignado = await this._rolPorUsuarioService.save(respuestRolEntity);
        return rolAsignado;
    }

    async verificarRoles(usuarioRol:RolPorUsuarioInterface): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: usuarioRol.usuario,
                rol: usuarioRol.rol

            }
        };
        return await this._rolPorUsuarioService.findOne(consulta);
    }

}