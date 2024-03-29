import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Contact } from "src/contacts/domain/contact.entity";
import { Inquiry } from "src/inquiries/domain/inquiry.entity";
import { User } from "src/users/domain/user.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  industry: string;

  @Column({ default: new Date() })
  issuedAt: Date;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postalAddress: string;

  @Column({ nullable: true })
  email: string;

  @Column({ length: 12 })
  phone: string;

  @OneToMany(() => Inquiry, inquiry => inquiry.client)
  inquiries: Inquiry[];

  @OneToMany(() => Contact, contact => contact.client)
  contacts: Contact[];

  @ManyToOne(() => User, user => user.clients, {
    onDelete: 'SET NULL'
  })
  user: User;
}