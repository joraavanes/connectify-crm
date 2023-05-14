import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateInquiryDto {
  constructor() {
    const issuedAt = new Date();
    issuedAt.setHours(0, 0, 0, 0);
    this.issuedAt = issuedAt;
  }

  @IsString()
  product: string;

  @IsDate()
  issuedAt: Date;

  @IsNumber()
  clientId: number;
}