import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { EventoPorConductorEntity } from "./evento-por-conductor.entity";
import {EventoPorConductor} from "./evento-por-conductor.controller";


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


}