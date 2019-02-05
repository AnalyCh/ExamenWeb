import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { RolEntity } from "src/rol/rol.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";


@Entity('rolesporusuario')
export class RolesporusuarioEntity {


    @PrimaryGeneratedColumn()
    rolesporusuarioid: number;
   
    @ManyToOne(
        type => RolEntity,
        pagina => pagina.rol_id
    )
    rol: RolEntity;

    @ManyToOne(
        type => UsuarioEntity,
        pagina => pagina.usuario_id
    )
    usuario: UsuarioEntity;


}