import {Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import {AutoEntity} from "../auto/auto.entity";
import {EventoPorConductorEntity} from "../evento-por-conductor/evento-por-conductor.entity";


@Entity('conductor')
export class ConductorEntity {
    @PrimaryGeneratedColumn()
    idConductor: number;

    @Index()
    @Column({
        name: 'nombre',
        type: 'varchar'
    })
    nombre: String;

    @Index()
    @Column({
        name: 'apellido',
        type: "varchar"
    })
    apellido: String;

    @Index()
    @Column({
        name: 'fecha-de-nacimiento',
        type: "date"
    })
    fechaDeNacimiento: Date;

    @Index()
    @Column({
        name: 'licencia-valida',
        type: Boolean
    })
    licenciaValida: boolean ;



    @OneToMany(
        type => AutoEntity,
        auto => auto.idConductor
    )
    autos: AutoEntity[];

    @OneToMany(
        type => EventoPorConductorEntity,
        eventoPorConductor => eventoPorConductor.idConductor
    )
    eventoPorConductores: EventoPorConductorEntity[];


    




}