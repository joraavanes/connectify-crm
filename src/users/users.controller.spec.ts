import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './domain/user.entity';
import { CreateUserDto, UserLoginDto } from './dtos';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const users: User[] = [];
    mockUsersService = {
      findByEmail: (email: string) => {
        const user = users.find(user => user.email === email);
        return Promise.resolve(user);
      },
      createUser: (dto: CreateUserDto) => {
        users.push({ id: 1, ...dto });
        return Promise.resolve({ id: 1, ...dto });
      }
    };
    mockAuthService = {
      signup: (dto: CreateUserDto) => Promise.resolve({ id: 1, ...dto }),
      signin: (dto: UserLoginDto) => Promise.resolve({ id: 1, fullname: '', role: '', department: '', ...dto })
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
