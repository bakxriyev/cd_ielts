import { WritingPart } from "@/modules/writing/model/writing-parts"
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator"

export class CreateWritingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNotEmpty()
  @IsString()
  user_id: string

  @ApiProperty({ example: 5, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: 2, description: "Writing question ID" })
  @IsNumber()
  writing_id: number

  @ApiProperty({ example: "This is my essay about environment.", description: "User answer text" })
  @IsString()
  answer_text: string

  @ApiProperty({ example: "PART1", description: "Writing task part (e.g., Task 1 or Task 2)" })
  @IsString()
  part: WritingPart

  @ApiProperty({ example: 15, description: "Score for writing task", required: false })
  @IsOptional()
  @IsNumber()
  score?: number
}
