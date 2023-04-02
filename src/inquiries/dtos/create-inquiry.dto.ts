import { IsDate, IsString } from "class-validator";

export class CreateInquiryDto {
  constructor() {
    this.issuedAt = new Date();
  }

  @IsString()
  client: string;

  @IsString()
  product: string;

  @IsDate()
  issuedAt: Date;
}