import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateWritingDto {
  @ApiProperty({ example: 6.5, description: "Writing part 1 score (IELTS band)" })
  @IsNumber()
  part1: number;

  @ApiProperty({ example: 7.0, description: "Writing part 2 score (IELTS band)" })
  @IsNumber()
  part2: number;
}
