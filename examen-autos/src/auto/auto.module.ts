import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoEntity } from "./auto-entity";
import { AutoController } from "./auto.controller";
import { AutoService } from "./auto.service";
import { ConductorService } from "src/conductor/conductor.service";
import { ConductorModule } from "src/conductor/conductor.module";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    AutoEntity
                ]
            ),
            ConductorModule
        ],
        controllers:[
            AutoController
        ],
        providers:[
            AutoService,
            ConductorService
        ],
        exports:[
            AutoService
        ]
    }
)
export class AutoModule{

}