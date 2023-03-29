import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './domain/user.entity';
import { CreateUserDto, ResetPasswordDto, UserLoginDto } from './dtos';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const users: User[] = [{ email: 'pitt@mail.com', password: 's93nd81' } as User];
    mockUsersService = {
      findByEmail: (email: string) => {
        const user = users.find(user => user.email === email);
        return Promise.resolve(user);
      },
      createUser: (dto: CreateUserDto) => {
        if (users.find(user => user.email === dto.email)) return Promise.reject('User already existing');
        users.push({ id: 1, ...dto });
        return Promise.resolve({ id: 1, ...dto });
      }
    };
    mockAuthService = {
      signup: (dto: CreateUserDto) => mockUsersService.createUser({ ...dto }),
      signin: (dto: UserLoginDto) => Promise.resolve({ id: 1, ...dto } as User),
      resetPassword: (dto: ResetPasswordDto) => {
        const user = users.find(user => user.email === dto.email);
        return user ? Promise.resolve(user) : Promise.reject();
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }, {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  const model = {
    id: 1,
    email: 'matt@mail.com',
    password: 'Some@Pass12',
    fullname: 'Matt Black',
    role: 'Commercial Manager',
    department: 'Sales Dept.'
  };

  test("should be defined", () => {
    expect(controller).toBeDefined();
  });

  test('should return a user based on given email', async () => {
    const user = await controller.findUser('pitt@mail.com');
    expect(user).toBeDefined();
  });

  test('throws on querying for non-existing user', (done) => {
    controller.findUser('brad@mail.com')
      .then()
      .catch(() => done());
  });

  test('signs up a new user', async () => {
    const user = await controller.signup({ email: 'dan@mail.com', password: 'bingo@2020' } as CreateUserDto, {});
    expect(user).toBeDefined();
  });

  test('throws on signing up a user with existing email', (done) => {
    controller.signup({ email: 'pitt@mail.com', password: 'abcdef' } as User, {})
      .then()
      .catch(() => done());
  });

  test('sign in a user successfully', async () => {
    const session = { userId: null };
    const user = await controller.signin({ email: 'pitt@mail.com', password: 'abcde' } as User, session);

    expect(session.userId).toBe(1);
    expect(user).toBeDefined();
  });

  test('throws if signing in a user that does\'t exist', (done) => {
    mockAuthService.signin = () => undefined;
    controller.signin({ email: 'pitt@mail.com', password: 'abcde' } as User, {})
      .then()
      .catch(() => done());
  });

  test('reset user\'s password successfully', async () => {
    const user = await controller.signup(model, {});
    const result = await controller.resetPassword({
      email: model.email,
      currentPassword: model.password,
      newPassword: 'new@pass',
      passwordConfirm: 'new@pass'
    });

    expect(result).toBeDefined();
  });

  test('fails to reset  user\'s password', done => {
    controller.signup(model, {}).then();
    controller.resetPassword({
      email: 'mike@mail.com',
      currentPassword: model.password,
      newPassword: 'new@pass',
      passwordConfirm: 'new@pass'
    })
      .then()
      .catch(() => done());
  });

});
