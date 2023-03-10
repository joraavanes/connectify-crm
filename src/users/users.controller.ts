import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Session,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto, UserDto, UserLoginDto } from './dtos';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
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

  @Post('signup')
  async singup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.singup(body);

    if (!user) throw new BadRequestException();

    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: UserLoginDto, @Session() session: any) {
    const user = await this.authService.singin(body);

    if (!user) throw new BadRequestException();

    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
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
