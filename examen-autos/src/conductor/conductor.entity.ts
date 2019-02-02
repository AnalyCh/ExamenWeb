import {Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { AutoEntity } from "src/auto/auto-entity";


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


    @ManyToOne(
        type => AutoEntity,
        auto => auto.conductores
    )
    auto: AutoEntity;




}