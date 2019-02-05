import {IsNotEmpty, IsEmail, Matches, IsString, IsNumberString, IsNumber, IsEnum, IsOptional, Length} from 'class-validator'

export class RoloDto {
    
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/)
    nombre: string;

    
}
