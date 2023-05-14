import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { Inquiry } from './domain/inquiry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inquiry]),
    ClientsModule
  ],
  providers: [InquiriesService],
  controllers: [InquiriesController]
})
export class InquiriesModule { }
