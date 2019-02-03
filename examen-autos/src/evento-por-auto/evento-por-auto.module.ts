import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoPorAutoController } from "./evento-por-auto.controller";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    EventoPorAutoModule
                ]
            )
        ],
        controllers:[
            EventoPorAutoController
        ],
        providers:[
        ],
        exports:[]
    }
)
export class EventoPorAutoModule {}