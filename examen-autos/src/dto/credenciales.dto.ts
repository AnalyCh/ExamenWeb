import {IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsEmail} from "class-validator";

export class CredencialesDto{

    @IsNotEmpty()
    @IsEmail()
    email_usuario?:string;


    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    @IsString()
    @IsNotEmpty()
    password_usuario?:string;



}