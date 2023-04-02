import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/domain/contact.entity';
import { Inquiry } from './inquiries/domain/inquiry.entity';
import { User } from './users/domain/user.entity';
import { UsersModule } from './users/users.module';
import { InquiriesModule } from './inquiries/inquiries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [Contact, User, Inquiry],
        synchronize: true
      })
    }),
    ContactsModule,
    UsersModule,
    InquiriesModule
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
