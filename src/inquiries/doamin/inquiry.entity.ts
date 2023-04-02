import { User } from "src/users/domain/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => User, user => user.inquiries)
  user: User;
}