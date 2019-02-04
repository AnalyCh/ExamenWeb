import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AutoEntity } from "src/auto/auto-entity";
import { EventoEntity } from "src/evento/evento.entity";


@Entity('eventoPorAuto')
export class EventoPorAutoEntity{
    
    @PrimaryGeneratedColumn()
    idEventoPorAuto: string;


    @ManyToOne(
        type => AutoEntity,
        auto => auto.eventoPorAutos
    )
    auto: AutoEntity;

    @ManyToOne(
        type => EventoEntity,
        evento => evento.eventosPorAuto
    )
    evento: EventoEntity;



}