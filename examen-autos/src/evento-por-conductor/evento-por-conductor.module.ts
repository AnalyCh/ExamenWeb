import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoPorConductorController } from "./evento-por-conductor.controller";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    EventoPorConductorModule
                ]
            )
        ],
        controllers:[
            EventoPorConductorController
        ],
        providers:[
        ],
        exports:[]
    }
)
export class EventoPorConductorModule {}