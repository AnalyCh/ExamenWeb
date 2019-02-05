import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import { RolesporusuarioEntity } from "./rolesporusuario.entity";
import { RolesporusuarioController } from "./rolesporusuario.controller";
import { RolesporusuarioService } from "./rolesporusuario.service";



@Module(
    {
        imports: [
            TypeOrmModule
                .forFeature(
                    [
                        RolesporusuarioEntity
                    ])
        ],
        controllers: [
            RolesporusuarioController
        ],
        providers: [
            RolesporusuarioService
        ],
        exports: [
          
        ]
    }
)
export class RolesporusuarioModule {

}







