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
  Delete,
  Query
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { AuthRoute } from 'src/guards/auth.guard';
import { CreateInquiryDto, InquiryDto, QueryInquiriesDto, UpdateInquiryDto } from './dtos';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('inquiries')
export class InquiriesController {
  constructor(
    private inquiriesService: InquiriesService
  ) { }

  @Get(':id')
  @Serialize(InquiryDto)
  async findInquiry(@Param('id', ParseIntPipe) id: number) {
    const inquiry = await this.inquiriesService.findById(id);
    if (!inquiry) throw new NotFoundException();

    return inquiry;
  }

  @Get()
  getFilteredInquiries(@Query() query: QueryInquiriesDto) {
    return this.inquiriesService.queryInquiries(query);
  }

  @Post()
  @AuthRoute()
  @Serialize(InquiryDto)
  createInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
    @CurrentUser() currentUser: User
  ) {
    return this.inquiriesService.createInquiry(createInquiryDto, currentUser);
  }

  @Patch(':id')
  @AuthRoute()
  @Serialize(InquiryDto)
  async udpateInquiry(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInquiryDto
  ) {
    const inquiry = await this.inquiriesService.updateInquiry(id, dto);
    if (!inquiry) throw new BadRequestException();

    return inquiry;
  }

  @Delete(':id')
  @AuthRoute()
  @Serialize(InquiryDto)
  async removeInquiry(@Param('id', ParseIntPipe) id: number) {
    const inquiry = await this.inquiriesService.removeInquiry(id);
    if (!inquiry) throw new BadRequestException();

    return inquiry;
  }
}
