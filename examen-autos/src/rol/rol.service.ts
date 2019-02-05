import {Injectable} from "@nestjs/common";


import {FindManyOptions, Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import { RolEntity } from "./rol.entity";

@Injectable()
export class RolService {
   
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,
    ) {
    }

    buscar(parametrosBusqueda?: FindManyOptions<RolEntity>)
        : Promise<RolEntity[]> {
        return this._rolRepository.find(parametrosBusqueda);
    }

    crear(rol: RolEntity): Promise<RolEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const rolcreate: RolEntity = this._rolRepository
            .create(rol);

        // Metodo Save Guarda en la BDD
        return this._rolRepository.save(rolcreate);

    }

    eliminar(rol_iddelete: number): Promise<RolEntity> {

        const rolEliminar: RolEntity = this._rolRepository
            .create({
                rol_id: rol_iddelete
            });

        return this._rolRepository.remove(rolEliminar);
    }

    actualizar(rolNuevo: RolEntity): Promise<RolEntity> {

        const rolEntity: RolEntity = this._rolRepository
            .create(rolNuevo);

        return this._rolRepository.save(rolEntity);

    }

    buscarPorId(rolid: number): Promise<RolEntity> {
        return this._rolRepository.findOne(rolid);
    }


}