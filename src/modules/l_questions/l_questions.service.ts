import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LQuestion } from "./entities/l_question.entity";
import { CreateLQuestionDto, UpdateLQuestionDto } from "./dto";

@Injectable()
export class LQuestionService {
  constructor(
    @InjectModel(LQuestion)
    private readonly questionModel: typeof LQuestion,
  ) {}

  async create(dto: CreateLQuestionDto): Promise<LQuestion> {
    return this.questionModel.create({
      ...dto,
      options: dto.options ?? null,
      correct_answers: dto.correct_answers ?? null,
      columns: dto.columns ?? null,
      rows: dto.rows ?? null,
      choices: dto.choices ?? null,
      answers: dto.answers ?? null,
      match_pairs: dto.match_pairs ?? null,
      photo: dto.photo ?? null,
    });
  }

  async findAll(): Promise<LQuestion[]> {
    return this.questionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<LQuestion> {
    const question = await this.questionModel.findByPk(id, { include: { all: true } });
    if (!question) throw new NotFoundException(`LQuestion with ID ${id} not found`);
    return question;
  }

  async update(id: number, dto: UpdateLQuestionDto): Promise<LQuestion> {
    const question = await this.findOne(id);
    return question.update({
      ...dto,
      options: dto.options ?? question.options,
      correct_answers: dto.correct_answers ?? question.correct_answers,
      columns: dto.columns ?? question.columns,
      rows: dto.rows ?? question.rows,
      choices: dto.choices ?? question.choices,
      answers: dto.answers ?? question.answers,
      match_pairs: dto.match_pairs ?? question.match_pairs,
      photo: dto.photo ?? question.photo,
    });
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
