import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './model/client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
