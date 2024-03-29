import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto, ResetPasswordDto, UserLoginDto } from './dtos';
import { UsersService } from './users.service';
import { User } from './domain/user.entity';
import { UserConfirmationDto } from './dtos/user-confirmation.dto';

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

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) return undefined;

    const [hash, salt] = user.password.split('.');
    const passwordValidity = await this.validatePasswordHash(hash, salt, dto.currentPassword);

    if (!passwordValidity) return undefined;

    const newSalt = randomBytes(8).toString('hex');
    const newHash = (await scrypt(dto.newPassword, newSalt, 32) as Buffer).toString('hex');

    const updates: User = {
      ...user,
      password: `${newHash}.${newSalt}`
    };

    return this.usersService.updateUser(user.id, updates);
  }

  async validatePasswordHash(storedHash: string, salt: string, plainPassword: string) {
    const result = (await scrypt(plainPassword, salt, 32) as Buffer).toString('hex');

    return storedHash === result;
  }

  async changeUserConfirmation(id: number, dto: UserConfirmationDto) {
    return this.usersService.updateUser(id, dto);
  }
}
