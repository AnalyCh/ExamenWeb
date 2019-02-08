import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity('rol_por_usuario')

export class RolPorUsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        type => RolEntity,
        rol => rol.rolesPorUsuario, {eager: true}
    )
    rol:RolEntity;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolesPorUsuario,
    )
    usuario: UsuarioEntity;
}