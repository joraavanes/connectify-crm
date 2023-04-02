import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  product: string;

  @Column()
  issuedAt: Date;
}