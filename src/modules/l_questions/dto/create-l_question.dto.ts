import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum, IsNumber } from "class-validator";
import { ListeningQuestionType } from "../entities/l_question.entity";
import { Transform } from "class-transformer";

export class CreateLQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  listening_questions_id: number;

  @ApiProperty({ example: "MCQ_SINGLE", enum: ListeningQuestionType })
  @IsEnum(ListeningQuestionType)
  q_type: ListeningQuestionType;

  @ApiProperty({ example: "What is the capital of France?" })
  @IsOptional()
  @IsString()
  q_text?: string;

  @ApiProperty({
    example: '{"A":"Paris","B":"London"}',
    description: "Options in JSON format",
  })
  @IsOptional()
  options?: any;

  @ApiProperty({
    example: '["A"]',
    description: "Correct answers in JSON array format",
  })
  @IsOptional()
  correct_answers?: any;

  @ApiProperty({ example: '{"col1":"Name","col2":"Age"}' })
  @IsOptional()
  columns?: any;

  @ApiProperty({ example: '{"row1":"John","row2":"Alice"}',type: "object" })
  @IsOptional()
  rows?: any;

  @ApiProperty({ example: '{"A":"the Chinese","B":"the Indians"}',type: "object" })
  @IsOptional()

  choices?: any;

  @ApiProperty({ example: '{"answer1":"Paris"}',type: "object" })
  @IsOptional()
  answers?: any;

  @ApiProperty({ example: '{"1":"A","2":"B"}' })
  @IsOptional()
  match_pairs?: any;

  @ApiProperty({ type: "string", format: "binary", required: false })
  @IsOptional()
  photo?: any;
}
