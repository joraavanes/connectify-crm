import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from './dtos/';
import { ContactsService } from './contacts.service';

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

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    const model = await this.contactsService.findByEmail(email);
    if (!model) {
      return new NotFoundException();
    }
    return model;
  }

  @Patch(':id')
  async updateContact(@Param('id') id: string, @Body() body: UpdateContactDto) {
    const model = await this.contactsService.updateContact(parseInt(id), body);

    if (!model) return new BadRequestException();

    return model;
  }

  @Delete(':id')
  async removeContact(@Param('id') id: string) {
    const model = await this.contactsService.removeContact(parseInt(id));

    if (!model) return new NotFoundException();

    return model;
  }
}
