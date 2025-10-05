import { PartialType } from "@nestjs/swagger";
import { CreateListeningAnswerDto } from "./create-listening_answer.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsBoolean, IsNumber, IsDate } from "class-validator";

export class UpdateListeningAnswerDto extends PartialType(CreateListeningAnswerDto) {
  @ApiPropertyOptional({ example: "B", description: "Updated user answer" })
  @IsOptional()
  @IsString()
  user_answer?: string;

  @ApiPropertyOptional({ example: true, description: "Mark answer as correct or not" })
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @ApiPropertyOptional({ example: "2025-09-27T15:40:00Z", description: "Update time" })
  @IsOptional()
  @IsDate()
  submitted_at?: Date;

  @ApiPropertyOptional({ example: "TFNG", description: "Question type" })
  @IsOptional()
  @IsString()
  answer_type?: string;

  @ApiPropertyOptional({ example: 1, description: "Updated LQuestion ID" })
  @IsOptional()
  @IsNumber()
  l_question_id?: number;

  @ApiPropertyOptional({ example: 3, description: "Updated exam ID" })
  @IsOptional()
  @IsNumber()
  examId?: number;
}
