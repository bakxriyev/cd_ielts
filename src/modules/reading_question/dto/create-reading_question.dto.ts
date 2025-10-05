// src/reading-question/dto/create-reading-question.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsNotEmpty, IsJSON, IsObject } from "class-validator";
import { ReadingPart } from "./reading-parts";

export class CreateReadingQuestionDto {
  @ApiProperty({ enum: Object.values(ReadingPart) })
  @IsEnum(ReadingPart)
  part: ReadingPart;

  @ApiProperty({ required: false, description: "Group title (optional)" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({required:true,description:"Reading id"})
  @IsNotEmpty()
  reading_id:string

  @ApiProperty({ required: false, description: "Group instruction text" })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiProperty({ required: false, description: "Optional photo filename or url" })
  @IsOptional()
  @IsString()
  photo?: string;
}
