import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoEntity } from "./auto-entity";
import { AutoController } from "./auto.controller";
import { AutoService } from "./auto.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    AutoEntity
                ]
            )
        ],
        controllers:[
            AutoController
        ],
        providers:[
            AutoService
        ],
        exports:[
            AutoService
        ]
    }
)
export class AutoModule{

}