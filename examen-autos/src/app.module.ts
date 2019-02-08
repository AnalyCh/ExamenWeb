import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AutoEntity } from './auto/auto.entity';
import { ConductorEntity } from './conductor/conductor.entity';
import { AutoModule } from './auto/auto.module';
import { ConductorModule } from './conductor/conductor.module';
import { EventoEntity } from './evento/evento.entity';
import { EventoModule } from './evento/evento.module';
import { EventoPorConductorEntity } from './evento-por-conductor/evento-por-conductor.entity';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {RolEntity} from "./rol/rol.entity";
import {RolesporusuarioEntity} from "./rolesporusuario/rolesporusuario.entity";
import {EventoPorConductorModule} from "./evento-por-conductor/evento-por-conductor.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 32769,
            database: 'vehiculos',
            username: 'root',
            password: 'root',
            synchronize: true,
            dropSchema: false,
            entities:[
                ConductorEntity,
                AutoEntity,
                EventoEntity,
                EventoPorConductorEntity,
                UsuarioEntity,
                RolEntity,
                RolesporusuarioEntity

            ]
        }),
        AutoModule,
        ConductorModule,
        EventoModule,
        EventoPorConductorModule,


    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
