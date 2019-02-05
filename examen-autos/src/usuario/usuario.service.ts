
import { UsuarioEntity } from "./usuario.entity";

import { FindManyOptions, Repository, FindOneOptions } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { UsuarioDto } from "./usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
    }

    buscar(parametrosBusqueda?: FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametrosBusqueda);
    }

    crear(usurio: UsuarioDto): Promise<UsuarioEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const usuarioEntity: UsuarioEntity = this._usuarioRepository
            .create(usurio);

        // Metodo Save Guarda en la BDD
        return this._usuarioRepository.save(usuarioEntity);

    }

    eliminar(usuario_iddelete: number): Promise<UsuarioEntity> {

        const usuarioEliminar: UsuarioEntity = this._usuarioRepository
            .create({
                usuario_id: usuario_iddelete
            });

        return this._usuarioRepository.remove(usuarioEliminar);
    }

    actualizar(usuarioNuevo: UsuarioEntity): Promise<UsuarioEntity> {

        const usuarioEntity: UsuarioEntity = this._usuarioRepository
            .create(usuarioNuevo);

        return this._usuarioRepository.save(usuarioEntity);

    }

    buscarPorId(usurioid: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(usurioid);
    }

    async autenticar(correo: string, password: string): Promise<UsuarioEntity> {
        // Password encriptada
        // Encriptar el passwrod que les llega

        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                correo: correo,
                password: password // password encriptado
            }
        };

        const respuesta = await this._usuarioRepository.findOne(consulta);

      return respuesta;

    }
}
