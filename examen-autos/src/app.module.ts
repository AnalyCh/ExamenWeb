import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AutoEntity } from './auto/auto-entity';
import { ConductorEntity } from './conductor/conductor.entity';
import { AutoModule } from './auto/auto.module';

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
                ConductorEntity
            ]
        }),
        AutoModule

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
