// exam.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Exam } from "./exam.model";
import { CreateExamDto, UpdateExamDto } from "./dto";
import { Listening } from "../listening";
import { ListeningQuestion } from "../listening_question/entities/listening_question.entity";
import { Reading } from "../reading";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";
import { Writing } from "../writing/model/writing.model";
import { RQuestion } from "../reading_subquestions/model/reading_subquestion.entity";
import { Passage } from "../passages/model/passage.entity";

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam) readonly examModel: typeof Exam) {}

  async create(dto: CreateExamDto, photo?: string): Promise<Exam> {
    return this.examModel.create({ ...dto, photo });
  }

  async findAll(): Promise<Exam[]> {
    return this.examModel.findAll();
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examModel.findByPk(id, {
      include: [
        {
          model: Listening,
          include: [ListeningQuestion],
        },
        {
          model: Reading,
          include: [ReadingQuestion
,Passage
          ],
        },
        {
          model: Writing,
        },
      ],
    });
    if (!exam) throw new NotFoundException("Exam not found");
    return exam;
  }

  async update(id: number, dto: UpdateExamDto, photo?: string): Promise<Exam> {
    const exam = await this.findOne(id);
    await exam.update({ ...dto, photo: photo ?? exam.photo });
    return exam;
  }

  async remove(id: number): Promise<void> {
    const exam = await this.findOne(id);
    await exam.destroy();
  }
}
