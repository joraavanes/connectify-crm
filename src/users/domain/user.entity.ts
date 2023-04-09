import { Inquiry } from "src/inquiries/domain/inquiry.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({nullable: true})
  role: string;

  @Column({ nullable: true })
  department: string;

  @OneToMany(() => Inquiry, Inquiry => Inquiry.user)
  inquiries: Inquiry[];

  @Column({ default: false })
  confirmed: boolean;
}