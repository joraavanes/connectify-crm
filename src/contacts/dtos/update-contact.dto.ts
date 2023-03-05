import {
  IsEmail,
  IsString,
  MaxLength,
  IsOptional
} from "class-validator";

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  mobile: string;
  
  @IsOptional()
  @IsEmail({}, { message: "Email is not valid" })
  email: string;
}