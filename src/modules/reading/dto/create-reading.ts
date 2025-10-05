import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, isString, IsString } from "class-validator"

export class CreateReadingDto {
  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: "The History of AI", description: "Passage title" })
  @IsString()
  @IsNotEmpty()
  passage_title: string

}
