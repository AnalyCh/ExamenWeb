import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository, FindManyOptions, FindOneOptions} from "typeorm";
import { EventoPorConductorEntity } from "./evento-por-conductor.entity";
import {EventoPorConductor} from "./evento-por-conductor.controller";
import {AutoEntity} from "../auto/auto.entity";


@Injectable()
export class EventoPorConductorService{
    constructor(
        @InjectRepository(EventoPorConductorEntity)
        private readonly _eventoPorConductorRepository: Repository<EventoPorConductorEntity>
    ){}

    crear(eventoConductor: EventoPorConductor): Promise<EventoPorConductorEntity>{
        const eventoEntity: EventoPorConductorEntity = this._eventoPorConductorRepository.create(eventoConductor);
        return this._eventoPorConductorRepository.save(eventoEntity)
    }

    buscar(parametrosConsulta: FindManyOptions<EventoPorConductorEntity>): Promise<EventoPorConductorEntity[]>{
        return this._eventoPorConductorRepository.find(parametrosConsulta)
    }

    buscarPorID(idEvento: number): Promise<EventoPorConductorEntity>{
        return this._eventoPorConductorRepository.findOne(idEvento)
    }

    buscarSiExiste(idEvento: number, idConductor:number): Promise<EventoPorConductorEntity[]>{
        return this._eventoPorConductorRepository.find({where:{idEvento: idEvento, idConductor: idConductor}})
    }

    eliminar(idEvento: number): Promise<EventoPorConductorEntity>{
        const registroAEliminar = this._eventoPorConductorRepository.create({idEventoPorConductor: idEvento});
        return this._eventoPorConductorRepository.remove(registroAEliminar);

    }


}