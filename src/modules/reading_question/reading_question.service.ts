import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReadingQuestion } from "./model/reading_question.entity";
import { RQuestion } from "../reading_subquestions/model/reading_subquestion.entity";

@Injectable()
export class ReadingQuestionService {
  constructor(
    @InjectModel(ReadingQuestion)
    private readonly readingQuestionModel: typeof ReadingQuestion
  ) {}

  async create(dto: any): Promise<ReadingQuestion> {
    return this.readingQuestionModel.create(dto);
  }

 async findAll(): Promise<ReadingQuestion[]> {
    return this.readingQuestionModel.findAll({
      include: [RQuestion],
    });
  }

  async findOne(id: number): Promise<ReadingQuestion> {
    const question = await this.readingQuestionModel.findByPk(id, {
      include: [RQuestion],
    });
    if (!question) {
      throw new NotFoundException(`ReadingQuestion #${id} not found`);
    }
    return question;
  }

  async update(id: number, dto: any): Promise<ReadingQuestion> {
    const question = await this.findOne(id);
    return question.update(dto);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
