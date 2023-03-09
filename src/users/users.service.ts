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

  async createUser(dto: CreateUserDto) {
    const model = await this.findByEmail(dto.email);
    if (model)
      return false;

    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) return false;

    const updatedUser = {
      ...user,
      ...attrs
    }

    return this.repo.save(updatedUser);
  }

  async removeUser(id: number) {
    const user = await this.findById(id);
    if (!user) return false;

    return this.repo.remove(user);
  }

  findUsers() {
    return this.repo.findBy({});
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  findById(id: number) {
    if(!id) return null;
    return this.repo.findOneBy({ id });
  }
}
