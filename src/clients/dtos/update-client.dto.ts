import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    industry: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    country: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    city: string;

    @IsString()
    @IsOptional()
    @MaxLength(240)
    postalAddress: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(240)
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    phone: string;
}