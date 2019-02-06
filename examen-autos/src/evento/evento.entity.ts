import { Entity, PrimaryGeneratedColumn, Index, Column, OneToMany } from "typeorm";
import { EventoPorConductorEntity } from "src/evento-por-conductor/evento-por-conductor.entity";


@Entity('evento')
export class EventoEntity{

    @PrimaryGeneratedColumn()
    idEvento: number;

    @Index()
    @Column({
        name: "nombre",
        type: "varchar"
    })
    nombre: string;

    @Index()
    @Column({
        name: "fecha",
        type: "date"
    })
    fecha: Date;

    @Index()
    @Column({
        name: "latitud",
        type: "varchar"
    })
    latitud: string;

    @Index()
    @Column({
        name: "longitud",
        type: "varchar"
    })
    longitud: string;


    @OneToMany(
        type => EventoPorConductorEntity,
        eventosPorAuto => eventosPorAuto.evento
    )
    eventosPorAuto: EventoPorConductorEntity[];




}