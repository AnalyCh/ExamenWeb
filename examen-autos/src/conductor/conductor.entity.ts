import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


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
    fechaDeNacimiento: Date





}