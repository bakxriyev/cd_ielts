// dto/update-rquestion.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateRQuestionDto } from "./create-reading_subquestion.dto";

export class UpdateRQuestionDto extends PartialType(CreateRQuestionDto) {}
