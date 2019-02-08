import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioModule} from './usuario/usuario.module';
import {UsuarioEntity} from './usuario/usuario.entity';
import {RolModule} from './rol/rol.module';
import {RolPorUsuarioModule} from './rolPorUsuario/rolPorUsuario.module';
import {RolEntity} from './rol/rol.entity';
import {RolPorUsuarioEntity} from './rolPorUsuario/rolPorUsuario.entity';


@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'vehiculos',
      synchronize: true,
      dropSchema: true,
      entities: [
       
        RolEntity,
        RolPorUsuarioEntity,
        UsuarioEntity
      ],
     }), 
    
    RolModule,
    RolPorUsuarioModule,
    UsuarioModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
