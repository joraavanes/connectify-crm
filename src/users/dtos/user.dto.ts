import { Expose, Transform } from 'class-transformer';
import { Inquiry } from 'src/inquiries/domain/inquiry.entity';

export class UserDto {
  @Expose()
  email: string;
  
  @Expose()
  fullname: string;
  
  @Expose()
  role: string;
  
  @Expose()
  department: string;

  @Expose()
  @Transform(({obj}) => obj.inquiries)
  inquiries: Inquiry[];
}