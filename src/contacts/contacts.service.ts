import { Injectable } from '@nestjs/common';
import { Contact } from './domain/contact.entity';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryContactsDto } from './dtos/query-contacts.dto';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private repo: Repository<Contact>,
    private clientsService: ClientsService
  ) { }

  async createContact(model: CreateContactDto) {
    const contact = this.repo.create({ ...model });
    const client = await this.clientsService.findClient(model.clientId);

    if (!client) return undefined;

    contact.client = client;
    return this.repo.save(contact);
  }

  findContacts() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({
      email
    });
  }

  queryContacts({ fullname, mobile, email, phone, role, count, pageNumber }: QueryContactsDto) {
    return this.repo.createQueryBuilder("contact")
      .leftJoinAndSelect("contact.client", "client")
      .select("contact.id, clientId, fullname, mobile, contact.email, contact.phone, role")
      .where(fullname ? "LOWER(fullname) = :fullname" : "TRUE", { fullname: fullname?.toLowerCase() })
      .andWhere(mobile ? "LOWER(mobile) = :mobile" : "TRUE", { mobile: mobile?.toLowerCase() })
      .andWhere(email ? "LOWER(contact.email) = :email" : "TRUE", { email: email?.toLowerCase() })
      .andWhere(phone ? "LOWER(contact.phone) = :phone" : "TRUE", { phone: phone?.toLowerCase() })
      .andWhere(role ? "LOWER(role) = :role" : "TRUE", { role: role?.toLowerCase() })
      .orderBy("contact.id", "DESC")
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
