import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from './dtos';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) { }

  async signup(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user) return undefined;

    const salt = randomBytes(8).toString('hex');

    const hash = await scrypt(dto.password, salt, 32) as Buffer;
    const hashedPassword = hash.toString('hex');

    const hashWithSalt = `${hashedPassword}.${salt}`;

    return this.usersService.createUser({
      ...dto,
      password: hashWithSalt
    });
  }

  async signin({ email, password }: UserLoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return undefined;

    const [hash, salt] = user.password.split('.');
    const passwordValidity = await this.validatePasswordHash(hash, salt, password);

    return passwordValidity ? user : undefined;
  }

  async validatePasswordHash(storedHash: string, salt: string, plainPassword: string) {
    const result = (await scrypt(plainPassword, salt, 32) as Buffer).toString('hex');

    return storedHash === result;
  }
}
