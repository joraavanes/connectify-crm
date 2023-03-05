import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Contact } from './domain/contact.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private repo: Repository<Contact>
  ) { }

  createContact(model: CreateContactDto) {
    const contact = this.repo.create({ ...model });
    return this.repo.save(contact);
  }

  findContacts() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({
      email
    })
  }

  async updateContact(id: number, attrs: Partial<Contact>) {
    const model = await this.repo.findOneBy({
      id
    });

    if (!model) return undefined;

    const updatedContact: Contact = {
      ...model,
      ...attrs
    };

    return this.repo.save(updatedContact);
  }

  async removeContact(id: number) {
    const model = await this.repo.findOneBy({
      id
    });

    if(!model) return undefined;

    return this.repo.remove(model);
  }
}
