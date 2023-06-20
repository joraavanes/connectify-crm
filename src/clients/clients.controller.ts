import { Body, Controller, ParseIntPipe,  Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { ClientsService } from './clients.service';
import { Authenticate } from 'src/guards/authenticate.guard';
import { UpdateClientDto } from './dtos/update-client.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClientDto } from './dtos/client.dto';

@Controller('clients')
@Serialize(ClientDto)
export class ClientsController {
    constructor(
        private clientsService: ClientsService
    ) { }

    @Get(':id')
    async findClient(@Param('id', ParseIntPipe) id: number) {
        const client = await this.clientsService.findClient(id);
        if (!client) throw new NotFoundException();

        return client;
    }

    @Get()
    findClients() {
        return this.clientsService.findClients();
    }

    @Post()
    @Authenticate()
    createClient(@Body() dto: CreateClientDto, @CurrentUser() user: User) {
        return this.clientsService.createClient(dto, user);
    }

    @Patch(':id')
    @Authenticate()
    async updateClient(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClientDto) {
        const client = await this.clientsService.updateClient(id, dto);
        if (!client) throw new NotFoundException();

        return client;
    }

    @Delete(':id')
    @Authenticate()
    async deleteClient(@Param('id', ParseIntPipe) id: number) {
        const client = await this.clientsService.deleteClient(id);
        if (!client) throw new NotFoundException();

        return client;
    }
}
