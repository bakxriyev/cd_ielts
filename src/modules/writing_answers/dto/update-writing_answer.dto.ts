import { PartialType } from "@nestjs/swagger"
import { CreateWritingAnswerDto } from "./create-writing_answer.dto"

export class UpdateWritingAnswerDto extends PartialType(CreateWritingAnswerDto) {}
