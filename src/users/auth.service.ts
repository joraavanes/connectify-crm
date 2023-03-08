import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) { }

  async singup(dto: CreateUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user) return false;

    const salt = randomBytes(8).toString('hex');

    const hash = await scrypt(dto.password, salt, 32) as Buffer;
    const hashedPassword = hash.toString('hex');

    const hashWithSalt = `${hashedPassword}.${salt}`;

    return this.usersService.createUser({
      ...dto,
      password: hashWithSalt
    });
  }

  singin() { }
}
