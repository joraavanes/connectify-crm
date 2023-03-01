import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Contact } from './domain/contact.entity';
import { CreateContactDto } from './dtos/create-contact.dto';

@Injectable()
export class ContactsService {
  private contacts: Contact[];

  constructor() {
    this.contacts = Array(5).fill(undefined).map(() => ({
      id: faker.datatype.number(),
      fullname: faker.name.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number(),
      phone: faker.phone.number(),
      role: faker.company.catchPhraseNoun()
    }));
  }

  createContact(contactDto: CreateContactDto) {
    this.contacts.push({
      id: faker.datatype.number(),
      ...contactDto
    });
  }

  findContacts() {
    return this.contacts;
  }
}
