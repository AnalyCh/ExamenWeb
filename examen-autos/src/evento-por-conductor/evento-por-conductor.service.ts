import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { EventoPorConductorEntity } from "./evento-por-conductor.entity";

@Injectable()
export class EventoPorConductorService{
    constructor(
        @InjectRepository(EventoPorConductorService)
        private readonly _eventoPorConductorRepository: Repository<EventoPorConductorEntity>
    ){}

    buscar(parametrosConsulta: FindManyOptions<EventoPorConductorEntity>): Promise<EventoPorConductorEntity[]>{
        return this._eventoPorConductorRepository.find(parametrosConsulta)
    }

    buscarPorID(idEvento: number): Promise<EventoPorConductorEntity>{
        return this._eventoPorConductorRepository.findOne(idEvento)
    }
}