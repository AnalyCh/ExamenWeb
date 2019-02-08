import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {RolPorUsuarioEntity} from "../rolPorUsuario/rolPorUsuario.entity";

@Entity('rol')

export class RolEntity {

    @PrimaryGeneratedColumn()

    id:number;

    @Column(
        {
            name:"rol_nombre",
            type:"varchar",
            length:30
        }
    )
    rol_nombre:string;

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolPorUsuario => rolPorUsuario.rol
    )


    rolesPorUsuario:RolPorUsuarioEntity[];
}