import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;
  
  @IsString()
  @IsNotEmpty()
  role: string;
  
  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  phone: string;
  
  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  mobile: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}