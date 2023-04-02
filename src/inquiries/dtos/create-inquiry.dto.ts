import { IsDate, IsString } from "class-validator";

export class CreateInquiryDto {
  @IsString()
  client: string;

  @IsString()
  product: string;

  @IsDate()
  issuedAt: Date;
}