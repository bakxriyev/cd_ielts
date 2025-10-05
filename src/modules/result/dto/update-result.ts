import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class UpdateResultDto {
  @ApiProperty({ example: 36, description: "Reading correct answers", required: false })
  @IsOptional()
  @IsNumber()
  reading_correct_answers?: number

  @ApiProperty({ example: 34, description: "Listening correct answers", required: false })
  @IsOptional()
  @IsNumber()
  listening_correct_answers?: number

  @ApiProperty({ example: 6.5, description: "Writing part 1 score", required: false })
  @IsOptional()
  @IsNumber()
  writing_part1_score?: number

  @ApiProperty({ example: 7, description: "Writing part 2 score", required: false })
  @IsOptional()
  @IsNumber()
  writing_part2_score?: number

  @ApiProperty({ example: 7.5, description: "Writing band score", required: false })
  @IsOptional()
  @IsNumber()
  writing_band_score?: number

  @ApiProperty({ example: 7.0, description: "Speaking score", required: false })
  @IsOptional()
  @IsNumber()
  speaking_score?: number

  @ApiProperty({ example: 7.2, description: "Overall band score", required: false })
  @IsOptional()
  @IsNumber()
  overall_band_score?: number
}
