import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([UsuarioEntity]),
        ],
        providers: [
            UsuarioService,
        ],
        controllers: [UsuarioController],
        exports: [UsuarioService],
    },
)
export class UsuarioModule {

}