import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { RolesporusuarioModule } from './rolesporusuario/rolesporusurio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolEntity } from './rol/rol.entity';
import { RolesporusuarioEntity } from './rolesporusuario/rolesporusuario.entity';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          database: 'vehiculos',
          username: 'root',
          password: 'contraseña',
          synchronize: true,
          dropSchema: true,
          entities: [
            RolEntity,
            RolesporusuarioEntity,
            UsuarioEntity
          ]
      }
  ),
  RolModule,
  RolesporusuarioModule,
  UsuarioModule
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
