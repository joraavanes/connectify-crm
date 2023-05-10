import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ClientsModule } from 'src/clients/clients.module';
import { Contact } from './domain/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    ClientsModule
  ],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
