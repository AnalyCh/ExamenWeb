import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { FindManyOptions, Like } from "typeorm";
import { RolService } from "./rol.service";

@Controller('rol')
export class RolController {

    constructor(private readonly _rolService: RolService) {

    }


}

