import { Expose, Transform } from "class-transformer";

export class ContactDto {
  @Expose()
  fullname: string;

  @Expose()
  role: string;

  @Expose()
  phone: string;

  @Expose()
  mobile: string;

  @Expose()
  email: string;

  @Transform(({ obj }) => obj?.client?.id)
  @Expose()
  clientId: number;
}