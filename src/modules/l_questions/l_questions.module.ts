import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LQuestion } from "./entities/l_question.entity";
import { LQuestionService } from "./l_questions.service";
import { LQuestionController } from "./l_questions.controller";

@Module({
  imports: [SequelizeModule.forFeature([LQuestion])],
  controllers: [LQuestionController],
  providers: [LQuestionService],
  exports: [LQuestionService],
})
export class LQuestionModule {}
