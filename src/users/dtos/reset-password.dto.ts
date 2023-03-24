import { IsEmail, IsString } from "class-validator";
import { Match as MatchWith } from "../../CustomValidators/MatchWith";

export class ResetPasswordDto {
  @IsEmail()
  email: string;
  
  @IsString()
  currentPassword: string;
  
  @IsString({ message: '' })
  @MatchWith(ResetPasswordDto, o => o.passwordConfirm)
  newPassword: string;
  
  @IsString()
  passwordConfirm: string;
}