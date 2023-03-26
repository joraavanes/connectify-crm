import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/domain/contact.entity';
import { User } from './users/domain/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'connectify-crm.sqlite',
      entities: [Contact, User],
      synchronize: true
    }),
    ContactsModule,
    UsersModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          secret: 'SOMESECRETKEY%20202'
        })
      )
      .forRoutes('*');
  }
}
