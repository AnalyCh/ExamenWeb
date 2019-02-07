import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { EventoEntity } from "src/evento/evento.entity";
import {ConductorEntity} from "../conductor/conductor.entity";


@Entity('eventoPorAuto')
export class EventoPorConductorEntity{
    
    @PrimaryGeneratedColumn()
    idEventoPorAuto: string;

    @ManyToOne(
        type => ConductorEntity,
        conductor => conductor.eventoPorConductores
    )
    idConductor: ConductorEntity;

    @ManyToOne(
        type => EventoEntity,
        evento => evento.eventosPorAuto
    )
    idEvento: EventoEntity;


}