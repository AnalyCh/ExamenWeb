import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConductorEntity } from "./conductor.entity";
import { ConductorController } from "./conductor.controller";
import { ConductorService } from "./conductor.service";
import {AutoService} from "../auto/auto.service";
import {AutoEntity} from "../auto/auto.entity";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    ConductorEntity,
                    AutoEntity
                ]
            )
        ],
        controllers:[
            ConductorController
        ],
        providers:[
            ConductorService,
            AutoService
        ],
        exports:[
            ConductorService
        ]
    }
)

export class ConductorModule{}