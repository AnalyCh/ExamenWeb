import { Entity, PrimaryGeneratedColumn, Index, Column, OneToMany } from "typeorm";
import { EventoPorAutoEntity } from "src/evento-por-auto/evento-por-auto.entity";


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
        type => EventoPorAutoEntity,
        eventosPorAuto => eventosPorAuto.evento
    )
    eventosPorAuto: EventoPorAutoEntity[];




}