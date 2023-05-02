import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateInquiryDto {
  // @IsString()
  // @IsOptional()
  // client: string;

  @IsString()
  @IsOptional()
  product: string;
}