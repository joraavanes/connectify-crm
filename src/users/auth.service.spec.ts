import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let MockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    MockUsersService = {
      findByEmail: (email: string) => Promise.resolve(),
      createUser: (user: CreateUserDto) => Promise.resolve({ id: 1, ...user })
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: MockUsersService
        }
      ]
    }).compile();

    service = module.get(AuthService);
  });

  const model = {
    id: 1,
    email: 'pitt@mail.com',
    password: 'Some@Pass12',
    fullname: 'Pitt Black',
    role: 'Commercial Manager',
    department: 'Sales Dept.'
  };

  test('creates an auth service instance', async () => {
    expect(service).toBeDefined();
  });

  test('signs up a new user successfully', async () => {

    const user = await service.singup(model);

    const [hash, salt] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
    expect(user.id).toBeDefined();
  });

  test('fails to sign up a new user, while the email is already in use', async () => {
    MockUsersService.findByEmail = (email: string) => Promise.resolve(model);
    const user = await service.singup(model);

    expect(user).not.toBeDefined();
  });
});