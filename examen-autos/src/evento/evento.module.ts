import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoEntity } from "./evento.entity";
import { EventoController } from "./evento.controller";
import { EventoService } from "./evento.service";
import {ConductorService} from "../conductor/conductor.service";
import {ConductorEntity} from "../conductor/conductor.entity";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    EventoEntity,
                    ConductorEntity
                ]
            )
        ],
        controllers:[
            EventoController,
        ],
        providers: [
            ConductorService,
            EventoService,

        ],
        exports:[
            EventoService
        ]
    }
)
export class EventoModule{

}