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
import { CreateInquiryDto } from './dtos';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { InquiryDto } from './dtos/inquiry.dto';
import { QueryInquiriesDto } from './dtos/query-inquiries.dto';
import { UpdateInquiryDto } from './dtos/update-inquiry.dto';

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
  getFilteredInquiries(@Query() query: QueryInquiriesDto) {
    return this.inquiriesService.queryInquiries(query);
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
  async udpateInquiry(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInquiryDto
  ) {
    const inquiry = await this.inquiriesService.updateInquiry(id, dto);
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
