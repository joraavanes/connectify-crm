import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/domain/contact.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'connectify-crm.sqlite',
      entities: [Contact],
      synchronize: true
    }),
    ContactsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
