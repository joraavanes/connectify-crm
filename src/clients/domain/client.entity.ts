import { Contact } from "src/contacts/domain/contact.entity";
import { Inquiry } from "src/inquiries/domain/inquiry.entity";
import { User } from "src/users/domain/user.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";

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

  @OneToMany(() => Inquiry, inquiry => inquiry.client, {
    onDelete: 'CASCADE'
  })
  inquiries: Inquiry[];

  @OneToMany(() => Contact, contact => contact.client, {
    onDelete: 'CASCADE'
  })
  contacts: Contact[];

  @ManyToOne(() => User, user => user.clients)
  user: User;
}