import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RQuestion } from "./model/reading_subquestion.entity";
import { CreateRQuestionDto } from "./dto/create-reading_subquestion.dto";
import { UpdateRQuestionDto } from "./dto/update-reading_subquestion.dto";

@Injectable()
export class RQuestionService {
  constructor(
    @InjectModel(RQuestion) private rQuestionModel: typeof RQuestion
  ) {}

  async create(dto: CreateRQuestionDto): Promise<RQuestion> {
    return this.rQuestionModel.create(dto);
  }

  async findAll(): Promise<RQuestion[]> {
    return this.rQuestionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<RQuestion> {
    const question = await this.rQuestionModel.findByPk(id, {
      include: { all: true },
    });
    if (!question) throw new NotFoundException("Question not found");
    return question;
  }

  async update(id: number, dto: UpdateRQuestionDto): Promise<RQuestion> {
    const question = await this.findOne(id);
    return question.update(dto);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
