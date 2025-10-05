import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ListeningAnswer } from ".//entities/listening_answer.entity"
import { ListeningAnswerService } from "./listening_answers.service"
import { ListeningAnswerController } from "./listening_answers.controller"
import { LQuestion } from "../l_questions/entities/l_question.entity"

@Module({
  imports: [SequelizeModule.forFeature([ListeningAnswer,LQuestion])],
  providers: [ListeningAnswerService],
  controllers: [ListeningAnswerController],
  exports: [ListeningAnswerService],
})
export class ListeningAnswerModule {}
