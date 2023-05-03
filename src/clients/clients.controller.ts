import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/domain/user.entity';
import { ClientsService } from './clients.service';
import { AuthRoute } from 'src/guards/auth.guard';
import { UpdateClientDto } from './dtos/update-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(
        private clientsService: ClientsService
    ) { }

    @Get(':id')
    async findClient(@Param('id') id: string) {
        const client = await this.clientsService.findClient(+id);
        if (!client) throw new NotFoundException();

        return client;
    }

    @Get()
    findClients() {
        return this.clientsService.findClients();
    }

    @Post()
    @AuthRoute()
    createClient(@Body() dto: CreateClientDto, @CurrentUser() user: User) {
        return this.clientsService.createClient(dto, user);
    }

    @Patch(':id')
    @AuthRoute()
    async updateClient(@Param('id') id: string, @Body() dto: UpdateClientDto) {
        const client = await this.clientsService.updateClient(+id, dto);
        if (!client) throw new NotFoundException();

        return client;
    }

    @Delete(':id')
    @AuthRoute()
    async deleteClient(@Param('id') id: string) {
        const client = await this.clientsService.deleteClient(+id);
        if (!client) throw new NotFoundException();

        return client;
    }
}
