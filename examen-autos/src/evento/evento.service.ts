import { Injectable } from "@nestjs/common";
import { EventoEntity } from "./evento.entity";
import { Repository, FindManyOptions } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Evento } from "./evento.controller";


@Injectable()
export class EventoService{
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<EventoEntity>): Promise<EventoEntity[]>{
        return this._eventoRepository.find(parametrosBusqueda)
    }

    crear(evento: Evento): Promise<EventoEntity>{
        const EventoEntity: EventoEntity = this._eventoRepository.create(evento);

        return this._eventoRepository.save(EventoEntity)
    }

    eliminar(idEvento: number): Promise<EventoEntity>{
        const EventoAEliminar = this._eventoRepository.create({idEvento: idEvento});
        return this._eventoRepository.remove(EventoAEliminar);

    }

    actualizar(nuevoEvento: Evento): Promise<EventoEntity>{
        const EventoEntity: EventoEntity = this._eventoRepository.create(nuevoEvento);
        return this._eventoRepository.save(EventoEntity);
    }

    buscarPorId(idEvento: number): Promise<EventoEntity>{
        return this._eventoRepository.findOne(idEvento);
    }

    buscarPorNombre(nombreEvento: string): Promise<EventoEntity>{
        return this._eventoRepository.findOne(nombreEvento);
    }
}