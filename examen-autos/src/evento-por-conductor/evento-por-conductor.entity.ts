import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {ConductorEntity} from "../conductor/conductor.entity";
import {EventoEntity} from "../evento/evento.entity";



@Entity('eventoPorConductor')
export class EventoPorConductorEntity{
    
    @PrimaryGeneratedColumn()
    idEventoPorConductor: number;



    @ManyToOne(
        type => ConductorEntity,
        conductor => conductor.eventoPorConductores
    )
    idConductor: ConductorEntity["idConductor"]| number;

    @ManyToOne(
        type => EventoEntity,
        evento => evento.eventosPorAuto
    )
    idEvento: EventoEntity["idEvento"] | number;


}