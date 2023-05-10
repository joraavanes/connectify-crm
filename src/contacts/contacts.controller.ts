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
import { CreateContactDto, UpdateContactDto } from './dtos/';
import { ContactsService } from './contacts.service';
import { QueryContactsDto } from './dtos/query-contacts.dto';
import { AuthRoute } from 'src/guards/auth.guard';

@Controller('contacts')
@AuthRoute('user', 'admin')
export class ContactsController {
  constructor(
    private contactsService: ContactsService
  ) { }

  @Post()
  createContact(@Body() body: CreateContactDto) {
    return this.contactsService.createContact(body);
  }

  @Get()
  findAll(@Query() dto: QueryContactsDto) {
    return this.contactsService.queryContacts(dto);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    const model = await this.contactsService.findByEmail(email);
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  @Patch(':id')
  async updateContact(@Param('id') id: string, @Body() body: UpdateContactDto) {
    const model = await this.contactsService.updateContact(parseInt(id), body);

    if (!model) throw new BadRequestException();

    return model;
  }

  @Delete(':id')
  async removeContact(@Param('id') id: string) {
    const model = await this.contactsService.removeContact(parseInt(id));

    if (!model) throw new NotFoundException();

    return model;
  }
}
