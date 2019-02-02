import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConductorEntity } from "./conductor.entity";


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
        ],
        providers:[

        ],
        exports:[

        ]
    }
)

export class ConductorModule{}