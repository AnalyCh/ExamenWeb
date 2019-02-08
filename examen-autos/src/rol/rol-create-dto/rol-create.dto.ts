import { IsOptional, IsInt, IsString, IsNotEmpty } from "class-validator";


export class RolDto {
    @IsOptional()
    @IsInt()

    id?:number;


    @IsString()
    @IsNotEmpty()
    rol_nombre:string;
}