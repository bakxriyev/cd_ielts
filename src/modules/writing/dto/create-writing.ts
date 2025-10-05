import { ApiProperty } from "@nestjs/swagger";
import { WritingPart } from "../model/writing-parts";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWritingDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  exam_id: number;

  @ApiProperty({ enum: WritingPart })
  @IsNotEmpty()
  part: WritingPart;

  @ApiProperty({ example: "Write an essay about global warming." })
  @IsNotEmpty()
  task_text: string;

  @ApiProperty({ type: "string", format: "binary", required: false })
  @IsOptional()
  task_image?: any;
}
