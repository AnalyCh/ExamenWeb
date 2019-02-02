import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoEntity } from "./auto-entity";
import { Repository, FindManyOptions } from "typeorm";
import { Auto } from "./auto.controller";


@Injectable()
export class AutoService{
    constructor(
        @InjectRepository(AutoEntity)
        private readonly _autoRepository: Repository<AutoEntity>
    ){}
    
    buscar(parametrosBusqueda?: FindManyOptions<AutoEntity>): Promise<AutoEntity[]>{
        return this._autoRepository.find(parametrosBusqueda)
    }

    crear(auto: Auto): Promise<AutoEntity>{
        const autoEntity: AutoEntity = this._autoRepository.create(auto);

        return this._autoRepository.save(autoEntity)
    }

    eliminar(idAuto: number): Promise<AutoEntity>{
        const autoAEliminar = this._autoRepository.create({idAuto: idAuto});
        return this._autoRepository.remove(autoAEliminar);

    }

    actualizar(nuevoAuto: Auto): Promise<AutoEntity>{
        const autoEntity: AutoEntity = this._autoRepository.create(nuevoAuto);
        return this._autoRepository.save(autoEntity);
    }

    buscarPorId(idAuto: number): Promise<AutoEntity>{
        return this._autoRepository.findOne(idAuto);
    }

    






}