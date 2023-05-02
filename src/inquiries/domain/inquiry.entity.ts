import { Client } from "src/clients/domain/client.entity";
import { User } from "src/users/domain/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  issuedAt: Date;

  @ManyToOne(() => User, user => user.inquiries, {
    onDelete: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Client, client => client.inquiries)
  client: Client;
}