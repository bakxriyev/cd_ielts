import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { Result } from "./model/result.model";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { ResultController } from "./result.controller";
import { ResultService } from "./result.service";
import { Writing } from "../writing/model/writing.model";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";

@Module({
  imports: [SequelizeModule.forFeature([Result, ReadingAnswer, ListeningAnswer, User, Exam,WritingAnswer,SpeakingAnswer])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultsModule {}
