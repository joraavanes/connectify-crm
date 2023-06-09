import { IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../domain/role.enum";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsEnum(
    [Role.Admin, Role.User],
    { each: true, message: "Roles are incorrect." }
  )
  roles: Role[];

  @IsOptional()
  @IsString()
  department: string;
}