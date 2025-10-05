import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateListeningAnswerDto {
  @ApiProperty({ example: 1, description: "User ID", })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  @IsNotEmpty()
  examId: number;

  @ApiProperty({ example: 3, description: "ListeningQuestion ID" })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({ example: 5, description: "LQuestion (sub-question) ID" })
  @IsNumber()
  @IsNotEmpty()
  l_questionsID: number;

  @ApiProperty({
    example: "A",
    description: "User's answer (string or JSON depending on question type)",
  })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    example: "MCQ_SINGLE",
    description: "Type of answer (e.g. TFNG, MCQ_SINGLE, etc.)",
  })
  @IsString()
  @IsNotEmpty()
  question_type: string;

  @ApiProperty({
    example: false,
    description: "Whether the answer is correct or not (computed automatically)",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_correct?: boolean;

  @ApiProperty({
    example: "2025-09-27T15:30:00Z",
    description: "Date when the answer was submitted",
    required: false,
  })
  @IsDate()
  @IsOptional()
  submitted_at?: Date;
}
