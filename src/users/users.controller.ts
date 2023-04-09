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
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto, UserDto, UserLoginDto, ResetPasswordDto } from './dtos';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './domain/user.entity';
import { AuthRoute } from '../guards/auth.guard';
import { UserConfirmationDto } from './dtos/user-confirmation.dto';

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

  @Get('current-user')
  @AuthRoute('admin', 'user')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get(':email')
  async findUser(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);

    if (!user) throw new BadRequestException();

    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: UserLoginDto, @Session() session: any) {
    const user = await this.authService.signin(body);

    if (!user) throw new BadRequestException();

    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Patch('resetpassword')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const user = await this.authService.resetPassword(dto);

    if (!user) throw new BadRequestException();

    return user;
  }

  @Patch('user-confirmation/:id')
  async userConfirmation(@Param('id', ParseIntPipe) id: number, @Body() dto: UserConfirmationDto) {
    const user = await this.authService.changeUserConfirmation(id, dto);

    if (!user) throw new BadRequestException();

    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const model = await this.usersService.updateUser(parseInt(id), body);

    if (!model) throw new BadRequestException();

    return model;
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    const model = await this.usersService.removeUser(email);
    if (!model) throw new NotFoundException();
    return model;
  }
}
