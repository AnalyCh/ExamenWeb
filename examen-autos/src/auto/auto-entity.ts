import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('auto')
export class AutoEntity {
    @PrimaryGeneratedColumn()
    idAuto: number;

    @Index()
    @Column({
        name: 'chasis'
    })
    chasis: string;

    @Index()
    @Column({
        name: 'nombre-marca'
    })
    nombreMarca: string;

    @Index()
    @Column({
        name: 'color-uno'
    })
    colorUno: string;

    @Index()
    @Column({
        name: 'color-dos'
    })
    colorDos: string;

    @Index()
    @Column({
        name: 'nombre-modelo'
    })
    nombreModelo: string;

    @Index()
    @Column({
        name: 'anio'
    })
    anio: string;




}