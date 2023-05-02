import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class QueryContactsDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @MaxLength(11)
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  mobile: string;

  @IsEmail({})
  @IsOptional()
  email: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @Min(5)
  count: number = 10;
  
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  pageNumber: number = 1;
}