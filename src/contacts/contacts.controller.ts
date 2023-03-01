import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dtos/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(
    private contactsService: ContactsService
  ) { }

  @Post()
  createContact(@Body() body: CreateContactDto) {
    return this.contactsService.createContact(body);
  }

  @Get()
  findAll() {
    return this.contactsService.findContacts();
  }
}
