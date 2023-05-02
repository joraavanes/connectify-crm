import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  industry: string;

  @Column()
  issuedAt: Date;
  
  @Column()
  country: string;
  
  @Column()
  city: string;
  
  @Column()
  postalAddress: string;
  
  @Column()
  email: string;

  @Column()
  phone: string;
}