import { Expose, Transform } from "class-transformer";
import { UserDto } from "src/users/dtos";

export class InquiryDto {
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