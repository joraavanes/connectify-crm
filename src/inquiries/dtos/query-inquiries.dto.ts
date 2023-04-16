import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

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
  
  @Transform(({ value }) => Boolean(+value))
  @IsBoolean()
  @IsOptional()
  user: boolean;
}