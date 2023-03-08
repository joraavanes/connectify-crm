import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your password' })
  password: string;
}