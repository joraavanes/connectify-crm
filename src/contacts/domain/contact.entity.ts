import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  role: string;

  @Column()
  phone: string;

  @Column({nullable: true})
  mobile: string;

  @Column()
  email: string;
}