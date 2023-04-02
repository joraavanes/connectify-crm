import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname: string;
  
  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  department: string;
}