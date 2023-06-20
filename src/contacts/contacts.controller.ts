import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
  Query
} from '@nestjs/common';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dtos/';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ContactsService } from './contacts.service';
import { QueryContactsDto } from './dtos/query-contacts.dto';
import { Authenticate } from 'src/guards/authenticate.guard';

@Controller('contacts')
@Authenticate()
export class ContactsController {
  constructor(
    private contactsService: ContactsService
  ) { }

  @Post()
  @Serialize(ContactDto)
  async createContact(@Body() body: CreateContactDto) {
    const contact = await this.contactsService.createContact(body);
    if (!contact) throw new BadRequestException();

    return contact;
  }

  @Get()
  findAll(@Query() dto: QueryContactsDto) {
    return this.contactsService.queryContacts(dto);
  }

  @Get(':email')
  @Serialize(ContactDto)
  async findOneByEmail(@Param('email') email: string) {
    const model = await this.contactsService.findByEmail(email);
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  @Patch(':id')
  @Serialize(ContactDto)
  async updateContact(@Param('id') id: string, @Body() body: UpdateContactDto) {
    const model = await this.contactsService.updateContact(parseInt(id), body);

    if (!model) throw new BadRequestException();

    return model;
  }

  @Delete(':id')
  @Serialize(ContactDto)
  async removeContact(@Param('id') id: string) {
    const model = await this.contactsService.removeContact(parseInt(id));

    if (!model) throw new NotFoundException();

    return model;
  }
}
