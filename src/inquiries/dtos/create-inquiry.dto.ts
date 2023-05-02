import { IsDate, IsString } from "class-validator";

export class CreateInquiryDto {
  constructor() {
    const issuedAt = new Date();
    issuedAt.setHours(0, 0, 0, 0);
    this.issuedAt = issuedAt;
  }

  // @IsString()
  // client: string;

  @IsString()
  product: string;

  @IsDate()
  issuedAt: Date;
}