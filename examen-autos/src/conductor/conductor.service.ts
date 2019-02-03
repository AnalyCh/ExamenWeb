import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConductorEntity } from "./conductor.entity";
import { Repository, FindManyOptions } from "typeorm";
import { Conductor } from "./conductor.controller";


@Injectable()
export class ConductorService{
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly _conductorRepository: Repository<ConductorEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<ConductorEntity>): Promise<ConductorEntity[]>{
        return this._conductorRepository.find(parametrosBusqueda)
    }

    crear(conductor: Conductor): Promise<ConductorEntity>{
        const conductorEntity: ConductorEntity = this._conductorRepository.create(conductor);

        return this._conductorRepository.save(conductorEntity)
    }

    eliminar(idConductor: number): Promise<ConductorEntity>{
        const conductorAEliminar = this._conductorRepository.create({idConductor: idConductor});
        return this._conductorRepository.remove(conductorAEliminar);

    }

    actualizar(nuevoconductor: Conductor): Promise<ConductorEntity>{
        const conductorEntity: ConductorEntity = this._conductorRepository.create(nuevoconductor);
        return this._conductorRepository.save(conductorEntity);
    }

    buscarPorId(idconductor: number): Promise<ConductorEntity>{
        return this._conductorRepository.findOne(idconductor);
    }

    
}