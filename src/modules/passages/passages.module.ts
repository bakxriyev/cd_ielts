import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Passage } from './model/passage.entity';
import { Reading } from '../reading/reading.model';
import { PassagesService } from './passages.service';
import { PassagesController } from './passages.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Passage, Reading]),
  ],
  providers: [PassagesService],
  controllers: [PassagesController],
})
export class PassagesModule {}
