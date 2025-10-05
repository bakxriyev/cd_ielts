import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './model/client.entity';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  create(dto: CreateClientDto) {
    return this.clientModel.create(dto);
  }

  findAll() {
    return this.clientModel.findAll();
  }

  async findOne(id: number) {
    const client = await this.clientModel.findByPk(id);
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(id: number, dto: UpdateClientDto) {
    const client = await this.findOne(id);
    await client.update(dto);
    return client;
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    await client.destroy();
    return { message: 'Client deleted successfully' };
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.clientModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, token: string | null): Promise<void> {
    const client = await this.findOne(id);
    if (client) {
      (client as any).refreshToken = token; // Agar modelda refreshToken column bo'lsa
      await client.save();
    }
  }
}
