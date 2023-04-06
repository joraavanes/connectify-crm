import { IsBoolean } from 'class-validator';

export class UserConfirmationDto {
  @IsBoolean()
  confirmed: boolean;
}