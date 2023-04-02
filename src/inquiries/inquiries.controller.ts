import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateInquiryDto } from './dtos';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';

@Controller('inquiries')
export class InquiriesController {
  constructor(
    private inquiriesService: InquiriesService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
    @CurrentUser() currentUser: User
  ) {
    return this.inquiriesService.createInquiry(createInquiryDto, currentUser);
  }
}
