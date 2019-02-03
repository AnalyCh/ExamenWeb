import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConductorEntity } from "./conductor.entity";
import { ConductorController } from "./conductor.controller";
import { ConductorService } from "./conductor.service";


@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    ConductorEntity
                ]
            )
        ],
        controllers:[
            ConductorController
        ],
        providers:[
            ConductorService
        ],
        exports:[
            ConductorService,
        ]
    }
)

export class ConductorModule{}