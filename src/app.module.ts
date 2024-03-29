import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieSession from 'cookie-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './contacts/domain/contact.entity';
import { Inquiry } from './inquiries/domain/inquiry.entity';
import { User } from './users/domain/user.entity';
import { UsersModule } from './users/users.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { CurrentUserMiddleware } from './middleswares/current-user.middleware';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/domain/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Contact, User, Inquiry, Client],
        synchronize: true
      })
    }),
    ContactsModule,
    UsersModule,
    InquiriesModule,
    ClientsModule
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
  constructor(
    private configService: ConfigService
  ) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          secret: this.configService.get<string>('COOKIE_SECRET'),
          maxAge: this.configService.get<number>('COOKIE_TIMEOUT_MINUTES') * 60 * 1000
        }),
        CurrentUserMiddleware
      )
      .forRoutes('*');
  }
}
