import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RQuestion } from "./model/reading_subquestion.entity";
import { RQuestionService } from "./reading_subquestions.service";
import { RQuestionController } from "./reading_subquestions.controller";

@Module({
  imports: [SequelizeModule.forFeature([RQuestion])],
  controllers: [RQuestionController],
  providers: [RQuestionService],
  exports:[RQuestionService]
})
export class RQuestionModule {}
