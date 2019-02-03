import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AutoEntity } from './auto/auto-entity';
import { ConductorEntity } from './conductor/conductor.entity';
import { AutoModule } from './auto/auto.module';
import { ConductorModule } from './conductor/conductor.module';
import { EventoEntity } from './evento/evento.entity';
import { EventoModule } from './evento/evento.module';
import { EventoPorAutoEntity } from './evento-por-auto/evento-por-auto.entity';

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
            dropSchema: true,
            entities:[
                AutoEntity,
                ConductorEntity,
                EventoEntity,
                EventoPorAutoEntity

            ]
        }),
        AutoModule,
        ConductorModule,
        EventoModule

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
