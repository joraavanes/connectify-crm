import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './domain/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) { }

  async createUser(dto: CreateUserDto): Promise<User | undefined> {
    const model = await this.findByEmail(dto.email);
    if (model)
      return undefined;

    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  async updateUser(id: number, attrs: Partial<User>): Promise<User | undefined> {
    const user = await this.findById(id);
    if (!user) return undefined;

    const updatedUser = {
      ...user,
      ...attrs
    }

    return this.repo.save(updatedUser);
  }

  async removeUser(email: string): Promise<User | undefined> {
    const user = await this.findByEmail(email);
    if (!user) return undefined;

    return this.repo.remove(user);
  }

  findUsers(): Promise<User[]> {
    return this.repo.findBy({});
  }

  findByEmail(email: string): Promise<User | void> {
    return this.repo.findOneBy({ email });
  }

  findById(id: number): Promise<User | void> {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
}
