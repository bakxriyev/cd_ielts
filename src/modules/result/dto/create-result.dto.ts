import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateResultDto {
  @ApiProperty({ example: 1, description: "User ID" })
  user_id: string;

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  exam_id: number;
}
