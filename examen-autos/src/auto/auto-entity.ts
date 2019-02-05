import {Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import { type } from "os";
import { ConductorEntity } from "src/conductor/conductor.entity";
import { EventoPorAutoEntity } from "src/evento-por-auto/evento-por-auto.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Entity('auto')
export class AutoEntity {
    @PrimaryGeneratedColumn()
    idAuto: number;

    @Index()
    @Column({
        name: 'chasis',
        type: 'int'
    })
    chasis: number;

    @Index()
    @Column({
        name: 'nombre-marca' ,
        type: 'varchar'
    })
    nombreMarca: string;

    @Index()
    @Column({
        name: 'color-uno',
        type: 'varchar'
    })
    colorUno: string;

    @Index()
    @Column({
        name: 'color-dos',
        type: 'varchar'
    })
    colorDos: string;

    @Index()
    @Column({
        name: 'nombre-modelo',
        type: 'varchar'
    })
    nombreModelo: string;

    @Index()
    @Column({
        name: 'anio',
        type: 'int'
    })
    anio: number;

    @ManyToOne(
        type => ConductorEntity,
        conductor => conductor.autos
    )
    conductor: ConductorEntity;

    @OneToMany(
        type => EventoPorAutoEntity,
        eventoPorAuto => eventoPorAuto.auto
    )
    eventoPorAutos: EventoPorAutoEntity[];

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.autos
    )
    usuario: UsuarioEntity;




}