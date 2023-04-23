import { Expose, Transform } from "class-transformer";

export class InquiryDto {
  @Expose()
  id: number;

  @Expose()
  client: string;
  
  @Expose()
  product: string;
  
  @Expose()
  issuedAt: Date;

  @Transform(({obj}) => obj?.user?.id)
  @Expose()
  userId: number;
}