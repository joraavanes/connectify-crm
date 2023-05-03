import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './domain/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';
import { User } from 'src/users/domain/user.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client) private repo: Repository<Client>
    ) { }

    findClient(id: number) {
        return this.repo.findOneBy({ id });
    }

    findClients() {
        return this.repo.find({
            order: {
                issuedAt: { direction: 'DESC' },
                id: { direction: 'DESC' }
            }
        })
    }

    createClient(dto: CreateClientDto, user: User) {
        const client = this.repo.create(dto);
        client.user = user;

        return this.repo.save(client);
    }

    async updateClient(id: number, attrs: Partial<Omit<Client, 'id'>>) {
        const client = await this.findClient(id);
        if (!client) return undefined;

        const updatedClient: Partial<User> = {
            ...client,
            ...attrs
        };

        return this.repo.save(updatedClient);
    }

    async deleteClient(id: number) {
        const client = await this.findClient(id);
        if (!client) return undefined;

        return this.repo.remove(client);
    }
}
