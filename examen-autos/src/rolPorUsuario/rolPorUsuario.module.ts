import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolService} from "../rol/rol.service";
import {RolController} from "../rol/rol.controller";
import { UsuarioService } from "src/usuario/usuario.service";
import { UsuarioModule } from "src/usuario/usuario.module";
import { RolModule } from "src/rol/rol.module";
import {RolPorUsuarioEntity} from "./rolPorUsuario.entity";
import {RolPorUsuarioService} from "./rolPorUsuario.service";
import {RolPorUsuarioController} from "./rolPorUsuario.controller";
@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [RolPorUsuarioEntity]),UsuarioModule,RolModule
        ],
        providers:[RolPorUsuarioService,RolService],
        controllers:[RolPorUsuarioController],
        exports:[RolPorUsuarioService]
    }
)
export class RolPorUsuarioModule {

}