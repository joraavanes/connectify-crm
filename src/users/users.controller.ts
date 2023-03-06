import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Get(':email')
  async findUser(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const model = await this.usersService.createUser(body);

    if (!model) throw new BadRequestException();

    return model;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const model = await this.usersService.updateUser(parseInt(id), body);

    if (!model) throw new BadRequestException();

    return model;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const model = await this.usersService.removeUser(parseInt(id));
    if (!model) throw new NotFoundException();
    return model;
  }
}
