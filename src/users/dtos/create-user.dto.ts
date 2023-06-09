import { IsArray, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../domain/role.enum";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullname: string;

  @IsEnum(
    [Role.Admin, Role.User],
    { each: true, message: "Roles are incorrect." }
  )
  roles: Role[];

  @IsOptional()
  @IsString()
  department: string;
}