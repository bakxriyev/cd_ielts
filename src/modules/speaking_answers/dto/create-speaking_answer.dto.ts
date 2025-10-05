import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSpeakingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNotEmpty()
  @IsString()
  user_id: string

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: 85, description: "Score (0-100 oralig‘ida)" })
  @IsOptional()
  @IsNumber()
  score?: number
}
