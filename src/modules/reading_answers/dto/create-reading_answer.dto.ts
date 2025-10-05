// dto/create-reading-answer.dto.ts
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReadingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty({ example: 5, description: "Question ID" })
  @IsNumber()
  questionId: number

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  examId: number

  @ApiProperty({ example: "B", description: "User javobi" })
  @IsNotEmpty()
  answer: string

  @ApiProperty({ example: 3, description: "RQuestion ID (subquestion ID)", required: false })
  @IsNumber()
  r_questionsID?: number

  @ApiProperty({ example: "MCQ_SINGLE", description: "Type of answer (e.g. TFNG, MCQ_SINGLE, etc.)" })
  @IsNotEmpty()
  question_type: string
}
