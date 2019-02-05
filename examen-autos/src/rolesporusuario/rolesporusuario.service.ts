import {Injectable} from "@nestjs/common";


import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import { RolesporusuarioEntity } from "./rolesporusuario.entity";

@Injectable()
export class RolesporusuarioService {
    constructor(
        @InjectRepository(RolesporusuarioEntity)
        private readonly _rolesporusuarioRepository: Repository<RolesporusuarioEntity>,
    ) {
    }

    buscar(parametrosBusqueda?: FindManyOptions<RolesporusuarioEntity>)
        : Promise<RolesporusuarioEntity[]> {
        return this._rolesporusuarioRepository.find(parametrosBusqueda);
    }

    crear(rolesporusuriocrear: RolesporusuarioEntity): Promise<RolesporusuarioEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const rolesporusurioEntity: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create(rolesporusuriocrear);

        // Metodo Save Guarda en la BDD
        return this._rolesporusuarioRepository.save(rolesporusurioEntity);

    }

    eliminar(rolesporusuario_iddelete: number): Promise<RolesporusuarioEntity> {

        const rolesporusuarioEliminar: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create({
                rolesporusuarioid: rolesporusuario_iddelete
            });

        return this._rolesporusuarioRepository.remove(rolesporusuarioEliminar);
    }

    actualizar(rolesporusuarioU: RolesporusuarioEntity): Promise<RolesporusuarioEntity> {

        const rolesporusuarioUpdate: RolesporusuarioEntity = this._rolesporusuarioRepository
            .create(rolesporusuarioU);

        return this._rolesporusuarioRepository.save(rolesporusuarioUpdate);

    }
    buscarPorId(rolesporusurioid: number): Promise<RolesporusuarioEntity> {
        
        return this._rolesporusuarioRepository.findOne(rolesporusurioid);
    }


}