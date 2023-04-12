import { IsEmail, IsString } from "class-validator";
import { Match as MatchWith } from "src/CustomValidators/MatchWith";

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  currentPassword: string;

  @IsString({ message: '' })
  @MatchWith(ResetPasswordDto, o => o.passwordConfirm, { message: 'Passwords don\'t match' })
  newPassword: string;

  @IsString()
  passwordConfirm: string;
}