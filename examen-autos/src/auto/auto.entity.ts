import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ConductorEntity} from "../conductor/conductor.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";



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
    idConductor: ConductorEntity;


    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.autos
    )
    idUsuario: UsuarioEntity;







}