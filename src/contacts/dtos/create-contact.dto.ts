import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional
} from "class-validator";

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

  @IsOptional()
  @IsString()
  @MaxLength(11)
  mobile: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Email is not valid" })
  email: string;
}