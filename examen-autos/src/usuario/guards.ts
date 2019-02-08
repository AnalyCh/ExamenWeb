import { Injectable } from "@nestjs/common";

@Injectable()

export class RolesService{
    public esAdministrador:boolean = false;
    public esUsuario:boolean = false;

}