import { PartialType } from "@nestjs/swagger";
import { CreateLQuestionDto } from "./create-l_question.dto";

export class UpdateLQuestionDto extends PartialType(CreateLQuestionDto) {}
