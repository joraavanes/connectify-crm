import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  @IsString()
  fullname: string;
  
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  department: string;
}