import { Expose, Transform } from 'class-transformer';
import { Inquiry } from 'src/inquiries/domain/inquiry.entity';
import { Role } from '../domain/role.enum';

export class UserDto {
  @Expose()
  email: string;
  
  @Expose()
  fullname: string;
  
  @Expose()
  roles: Role[];
  
  @Expose()
  department: string;

  @Expose()
  @Transform(({obj}) => obj.inquiries)
  inquiries: Inquiry[];
}