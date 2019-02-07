import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoPorConductorController } from "./evento-por-conductor.controller";
import {EventoPorConductorService} from "./evento-por-conductor.service";
import {EventoService} from "../evento/evento.service";
import {ConductorService} from "../conductor/conductor.service";
import {EventoPorConductorEntity} from "./evento-por-conductor.entity";
import {EventoEntity} from "../evento/evento.entity";
import {ConductorEntity} from "../conductor/conductor.entity";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    EventoPorConductorEntity,
                    EventoEntity,
                    ConductorEntity
                ]
            )
        ],
        controllers:[
            EventoPorConductorController
        ],
        providers:[
            EventoPorConductorService,
            EventoService,
            ConductorService
        ],
        exports:[
            EventoPorConductorService
        ]
    }
)
export class EventoPorConductorModule {}