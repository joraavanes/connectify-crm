import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from './domain/inquiry.entity';
import { User } from 'src/users/domain/user.entity';
import { CreateInquiryDto } from './dtos';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry) private repo: Repository<Inquiry>
  ) { }

  createInquiry(dto: CreateInquiryDto, currentUser: User) {
    const inquiry = this.repo.create(dto);
    inquiry.user = currentUser;

    return this.repo.save(inquiry);
  }
}
