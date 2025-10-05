import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Reading } from "./reading.model"
import { CreateReadingDto } from "./dto/create-reading"
import { UpdateReadingDto } from "./dto/update-rading"
import { ReadingQuestion } from "../reading_question/model/reading_question.entity"
import { RQuestion } from "../reading_subquestions/model/reading_subquestion.entity"
import { Passage } from "../passages/model/passage.entity"

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading) readonly readingRepository: typeof Reading
  ) {}

  async create(dto: CreateReadingDto): Promise<Reading> {
    return this.readingRepository.create(dto)
  }

  async findAll(): Promise<Reading[]> {
    return this.readingRepository.findAll({
      include: [
        {
          model: ReadingQuestion,
          include: [RQuestion], // nested include
        },
        {
          model:Passage,
          include:[Passage]
        }
      ],
    });
  }

  async findOne(id: number): Promise<Reading> {
    const reading = await this.readingRepository.findByPk(id, {
      include: [
        {
          model: ReadingQuestion,
          include: [RQuestion],
        },
        {
          model:Passage,
          
        }
      ],
    });
    if (!reading) throw new NotFoundException("Reading not found");
    return reading;
  }

  async update(id: number, dto: UpdateReadingDto): Promise<Reading> {
    const reading = await this.findOne(id)
    return reading.update(dto)
  }

  async remove(id: number): Promise<void> {
    const reading = await this.findOne(id)
    await reading.destroy()
  }
}
