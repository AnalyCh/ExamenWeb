import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolEntity } from "./rol.entity";
import { Repository } from "typeorm";
import {RolDto} from "./rol-create-dto/rol-create.dto";

@Injectable()

export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolService: Repository<RolEntity>){

    }

    crearRol(rol:RolDto){
        const respuesta= this._rolService.create(rol)
        return this._rolService.save(respuesta)
    }

    obtenerRol(){
        return this._rolService.find()
    }


}