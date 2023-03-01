import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Contact } from './domain/contact.entity';

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
  
  findContacts() {
    return this.contacts;
  }
}
