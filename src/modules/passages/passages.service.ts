import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Passage } from './model/passage.entity';
import { Reading } from '../reading/reading.model';
import { CreatePassageDto, UpdatePassageDto } from './dto';

@Injectable()
export class PassagesService {
  constructor(
    @InjectModel(Passage)
    private readonly passageModel: typeof Passage,
  ) {}

  async create(createPassageDto: CreatePassageDto): Promise<Passage> {
    // passage yaratish
    return this.passageModel.create(createPassageDto);
  }

  async findAll(): Promise<Passage[]> {
    // barcha passage larni reading bilan birga olish
    return this.passageModel.findAll({ include: [Reading] });
  }

  async findOne(id: number): Promise<Passage> {
    const passage = await this.passageModel.findByPk(id, { include: [Reading] });
    if (!passage) throw new NotFoundException('Passage not found');
    return passage;
  }

  async update(id: number, updatePassageDto: UpdatePassageDto): Promise<Passage> {
    const passage = await this.findOne(id);
    return passage.update(updatePassageDto);
  }

  async remove(id: number): Promise<void> {
    const passage = await this.findOne(id);
    await passage.destroy();
  }
}
