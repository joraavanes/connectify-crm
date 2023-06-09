import { Client } from "src/clients/domain/client.entity";
import { Inquiry } from "src/inquiries/domain/inquiry.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

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

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.User]
  })
  roles: Role[];

  @Column({ nullable: true })
  department: string;

  @OneToMany(() => Inquiry, inquiry => inquiry.user)
  inquiries: Inquiry[];

  @OneToMany(() => Client, client => client.user)
  clients: Client[];

  @Column({ default: false })
  confirmed: boolean;
}