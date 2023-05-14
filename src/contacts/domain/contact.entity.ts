import { Client } from 'src/clients/domain/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column({ nullable: true })
  mobile: string;

  @Column()
  email: string;

  @ManyToOne(() => Client, client => client.contacts, {
    onDelete: 'SET NULL'
  })
  client: Client;
}