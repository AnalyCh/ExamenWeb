import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RolEntity} from '../rol/rol.entity';
import {RolPorUsuarioEntity} from '../rolPorUsuario/rolPorUsuario.entity';
import {AutoEntity} from "../auto/auto.entity";

@Entity('usuario')

export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(
        {
            name: 'nombre_usuario',
            type: 'varchar',
            length: 30,
            default: 'nombre',
        },
    )
    nombre_usuario: string;

    @Column(
        {
            name: 'email_usuario',
            type: 'varchar',
            length: 30,
            default: 'email',
        },
    )
    email_usuario: string;

    @Column(
        {
            name: 'password_usuario',
            type: 'varchar',
            length: 30,
            default: '1234',
        },
    )
    password_usuario: string;

    @Column(
        {
            name: 'fecha_nacimiento_usuario',
            type: 'varchar',
            default: '1/1/1995',
        },
    )
    fecha_nacimiento_usuario: string;

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolPorUsuario => rolPorUsuario.usuario, {eager: true},
    )
    rolesPorUsuario: RolPorUsuarioEntity[];

    @OneToMany(
        type => AutoEntity,
        auto => auto.idUsuario
    )
    autos: AutoEntity[]

}