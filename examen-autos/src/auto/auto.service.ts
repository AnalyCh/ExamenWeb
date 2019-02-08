import { Injectable} from "@nestjs/common";
import {AutoEntity} from "./auto.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {Auto} from "./auto.controller";


@Injectable()
export class AutoService {
    constructor(
        @InjectRepository(AutoEntity)
        private readonly _autoRepository: Repository<AutoEntity>
    ){}

    buscar(parametrosBusqueda?: FindManyOptions<AutoEntity>):Promise<AutoEntity[]>{
        return this._autoRepository.find(parametrosBusqueda)
    }

    crear(auto: Auto): Promise<AutoEntity>{
        // @ts-ignore
        const autoEntity: AutoEntity = this._autoRepository.create(auto);
        return this._autoRepository.save(autoEntity)
    }
    eliminar(idAuto: number): Promise<AutoEntity>{
        const autoAEliminar = this._autoRepository.create({idAuto: idAuto});
        return this._autoRepository.remove(autoAEliminar);

    }

    actualizar(nuevoAuto: AutoEntity): Promise<AutoEntity>{
        const autoEntity: AutoEntity = this._autoRepository.create(nuevoAuto);
        return this._autoRepository.save(autoEntity);
    }

    buscarPorId(idAuto: number): Promise<AutoEntity>{
        return this._autoRepository.findOne(idAuto);
    }

    buscarPorIdSession(idSession: number):Promise<AutoEntity>{
        return this._autoRepository.findOne({where: {idUsuario: +idSession}})
    }
}