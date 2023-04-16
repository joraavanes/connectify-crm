import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  Delete
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { AuthRoute } from 'src/guards/auth.guard';
import { CreateInquiryDto } from './dtos';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { InquiryDto } from './dtos/inquiry.dto';

@Controller('inquiries')
@Serialize(InquiryDto)
export class InquiriesController {
  constructor(
    private inquiriesService: InquiriesService
  ) { }

  @Get(':id')
  async findInquiry(@Param('id', ParseIntPipe) id: number) {
    const inquiry = await this.inquiriesService.findById(id);
    if (!inquiry) throw new NotFoundException();

    return inquiry;
  }

  @Get()
  findInquiries() {
    return this.inquiriesService.findInquiries();
  }

  @Post()
  @AuthRoute()
  createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
    @CurrentUser() currentUser: User
  ) {
    return this.inquiriesService.createInquiry(createInquiryDto, currentUser);
  }

  @Patch(':id')
  async udpateInquiry(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const inquiry = await this.inquiriesService.updateInquiry(id, body);
    if (!inquiry) throw new BadRequestException();

    return inquiry;
  }

  @Delete(':id')
  async removeInquiry(@Param('id', ParseIntPipe) id: number) {
    const inquiry = await this.inquiriesService.removeInquiry(id);
    if (!inquiry) throw new BadRequestException();

    return inquiry;
  }
}
