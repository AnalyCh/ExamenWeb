import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { RolesporusuarioEntity } from "src/rolesporusuario/rolesporusuario.entity";
import {AutoEntity} from "../auto/auto.entity";


@Entity('usuario')
export class UsuarioEntity {

   
   
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    password: string;

    @Column()
    fecha_nacimiento: Date;

    @OneToMany(
        type => RolesporusuarioEntity,  
        pagina => pagina.rol
    )
    paginas: RolesporusuarioEntity[];

    @OneToMany(
        type => AutoEntity,
        auto => auto.idUsuario
    )
    autos: AutoEntity[];

}