import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  email: string;
  
  @Expose()
  fullname: string;
  
  @Expose()
  role: string;
  
  @Expose()
  department: string;
}