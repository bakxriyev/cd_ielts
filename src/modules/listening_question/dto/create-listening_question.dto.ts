import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsOptional, IsEnum, IsNumber } from "class-validator";

export class CreateListeningQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  listening_id: number;

  @ApiProperty({ example: "Part 1 Questions" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: "Listen to the audio and answer the questions." })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiProperty({ example: "photo.png" })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ example: "PART1", enum: ["PART1", "PART2", "PART3", "PART4"] })
  @IsEnum(["PART1", "PART2", "PART3", "PART4"])
  part: string;

  @ApiProperty({ example: "audio.mp3" })
  @IsOptional()
  @IsString()
  audio?: string;
}
