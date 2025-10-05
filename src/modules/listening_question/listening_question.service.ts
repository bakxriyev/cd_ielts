import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ListeningQuestion } from "./entities/listening_question.entity";
import { CreateListeningQuestionDto, UpdateListeningQuestionDto } from "./dto";
import { LQuestion } from "../l_questions/entities/l_question.entity";

@Injectable()
export class ListeningQuestionService {
  constructor(
    @InjectModel(ListeningQuestion)
    private readonly questionModel: typeof ListeningQuestion,
  ) {}

  async create(dto: CreateListeningQuestionDto, audio?: string): Promise<ListeningQuestion> {
    return this.questionModel.create({
      ...dto,
      audio,
      created_at: new Date(),
    });
  }

  async findAll(): Promise<ListeningQuestion[]> {
    return this.questionModel.findAll({ 
      include: [LQuestion] 
    });
  }

  async findOne(id: number): Promise<ListeningQuestion> {
    const question = await this.questionModel.findByPk(id, 
      {include: [LQuestion] 
        
      });
    if (!question) throw new NotFoundException("Listening question not found");
    return question;
  }

  async update(id: number, dto: UpdateListeningQuestionDto, audio?: string): Promise<ListeningQuestion> {
    const question = await this.findOne(id);

    return question.update({
      ...dto,
      audio: audio ?? question.audio,
    });
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
