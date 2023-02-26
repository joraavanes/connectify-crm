import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Contact{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;
  
  @Column()
  role: string;
  
  @Column()
  phone: string;
  
  @Column()
  mobile: string;

  @Column()
  email: string;
}