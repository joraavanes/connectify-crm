import { Expose, Transform } from "class-transformer";

export class ClientDto {
  @Expose()
  id: number;
  
  @Expose()
  name: string;

  @Expose()
  industry: string;

  @Expose()
  issuedAt: Date;

  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  postalAddress: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;
  
  @Expose()
  @Transform(({ obj }) => obj?.user?.id)
  userId: number;
}