import {Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { AutoEntity } from "src/auto/auto-entity";
import { type } from "os";


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
        auto => auto.conductor
    )
    autos: AutoEntity[];

    




}