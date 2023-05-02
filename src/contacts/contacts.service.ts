import { Injectable } from '@nestjs/common';
import { Contact } from './domain/contact.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryContactsDto } from './dtos/query-contacts.dto';

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

  queryContacts({ fullname, mobile, email, phone, role, count, pageNumber }: QueryContactsDto) {
    return this.repo.createQueryBuilder()
      .select("*")
      .where(fullname ? "fullname = :fullname" : "TRUE", { fullname })
      .andWhere(mobile ? "mobile = :mobile" : "TRUE", { mobile })
      .andWhere(email ? "email = :email" : "TRUE", { email })
      .andWhere(phone ? "phone = :phone" : "TRUE", { phone })
      .andWhere(role ? "role = :role" : "TRUE", { role })
      .orderBy("id", "DESC")
      .offset((pageNumber - 1) * pageNumber)
      .limit(count)
      .getRawMany();
  }

  async updateContact(id: number, attrs: Partial<Contact>) {
    const model = await this.repo.findOneBy({
      id
    });

    if (!model) return false;

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

    if (!model) return false;

    return this.repo.remove(model);
  }
}
