import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let MockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    MockUsersService = {
      findByEmail: (email: string) => {
        const user = users.find(user => user.email === email);
        return Promise.resolve(user)
      },
      createUser: (user: CreateUserDto) => {
        users.push({ id: 1, ...user });
        return Promise.resolve({ id: 1, ...user } as User);
      }
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

    const user = await service.signup(model);

    const [hash, salt] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
    expect(user.id).toBeDefined();
  });

  test('fails to sign up a new user, while the email is already in use', async () => {
    // MockUsersService.findByEmail = (email: string) => Promise.resolve(model);
    const user1 = await service.signup(model);
    const user2 = await service.signup(model);

    expect(user2).not.toBeDefined();
  });

  test('fails to sign in if the provided password is wrong', async () => {
    // MockUsersService.findByEmail = () => Promise.resolve({ ...model, password: 'ksdflkj.sdfkjl' });
    await service.signup({ ...model, password: 'bingo' });
    const user = await service.signin({ email: model.email, password: model.password });

    expect(user).not.toBeDefined();
  });

  test('signs in if the correct password is provided', async () => {
    // MockUsersService.findByEmail =
    //   () => Promise.resolve({ ...model, password: 'c5ac4a559baa07b8f7706697f9f2f6ac30dcb47d259464039e11a7524f6a06c3.kdsfin342' });
    await service.signup(model);
    const user = await service.signin({ email: model.email, password: model.password });

    expect(user).toBeDefined();
  });
});