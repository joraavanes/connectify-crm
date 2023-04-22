import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class QueryInquiriesDto {
  @IsString()
  @IsOptional()
  client: string;

  @IsString()
  @IsOptional()
  product: string;

  @IsOptional()
  @Transform(({ value }) => {
    return value ? new Date(value) : null;
  })
  @IsDate()
  issuedAt: Date;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  user: boolean;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  count: number = 10;
  
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  pageNumber: number = 1;
}