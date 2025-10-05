import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { SpeakingAnswer } from "./entities/speaking_answer.entity"
import { CreateSpeakingAnswerDto } from "./dto"

@Injectable()
export class SpeakingAnswerService {
  constructor(
    @InjectModel(SpeakingAnswer)
    private readonly speakingAnswerRepo: typeof SpeakingAnswer,
  ) {}

  async create(dto: CreateSpeakingAnswerDto) {
    return this.speakingAnswerRepo.create({
      ...dto,
    } as any)
  }

  async findAll() {
    return this.speakingAnswerRepo.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return this.speakingAnswerRepo.findByPk(id, { include: { all: true } })
  }
}
