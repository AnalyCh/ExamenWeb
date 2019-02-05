import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity('rol')
export class RolEntity {


    @PrimaryGeneratedColumn()
    rol_id: number;

    @Column()
    nombre: string;

   

}