// dto/create-rquestion.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsObject,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReadingQuestionType } from "../model/reading_subquestion.entity";

export class CreateRQuestionDto {
  @ApiProperty({ example: 1, description: "Reading question ID (parent ID)" })
  @IsNumber()
  reading_questions_id: number;

  @ApiProperty({
    enum: ReadingQuestionType,
    description: "Question type (enum)",
    example: ReadingQuestionType.MULTIPLE_CHOICE_SINGLE,
  })
  @IsEnum(ReadingQuestionType)
  q_type: ReadingQuestionType;

  @ApiPropertyOptional({
    example: "What is the main idea of paragraph 1?",
    description: "Savol matni",
  })
  @IsOptional()
  @IsString()
  q_text?: string;

 @ApiProperty({
    example: '{"A":"Paris","B":"London"}',
    description: "Options in JSON format",
  })
  @IsOptional()
  options?: any;

  @ApiPropertyOptional({
    type: [String],
    example: ["B"],
    description: "To‘g‘ri javob(lar)",
  })
  @IsOptional()
  @IsArray()
  correct_answers?: string[];

  @ApiPropertyOptional({
    type: [Object],
    example: [
      { left: "1", right: "A" },
      { left: "2", right: "C" },
    ],
    description: "Matching pairs (faqat MATCHING uchun)",
  })
  @IsOptional()
  @IsArray()
  match_pairs?: any[];

  @ApiPropertyOptional({
    type: [Object],
    example: [
      { index: 12, max_words: 2 },
      { index: 25, max_words: 1 },
    ],
    description: "Blanks (fill in the blank uchun)",
  })
  @IsOptional()
  @IsArray()
  blanks?: any[];

  @ApiPropertyOptional({
  type: Object,
  example: {
    A: "the Chinese",
    B: "the Indians",
    C: "the British",
    D: "the Arabs"
  },
  description: "Matching information variantlari (choices)"
})
@IsOptional()
@IsObject()
choices?: Record<string, string>;

  @ApiPropertyOptional({
    type: String,
    example: "uploads/questions/diagram.png",
    description: "Savol rasmi yoki diagram",
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ["Species", "French", "Spanish", "South African ball roller"],
    description: "Jadval ustunlari (columns)",
  })
  @IsOptional()
  @IsArray()
  columns?: string[];

  @ApiPropertyOptional({
    type: [Array],
    example: [
      ["Preferred climate", "cool", "", ""],
      ["Complementary species", "Spanish", "", ""],
      ["Start of active period", "late spring", "", ""],
      ["Number of generations per year", "1 - 2", "", ""],
    ],
    description: "Jadval satrlari (rows)",
  })
  @IsOptional()
  @IsArray()
  rows?: string[][];

  @ApiPropertyOptional({
    type: Object,
    example: {
      "0_2": "warm",              // row 0, col 2
      "0_3": "dry climate",       // row 0, col 3
      "1_3": "African species",   // row 1, col 3
      "2_2": "early summer",      // row 2, col 2
      "3_2": "3 - 4"              // row 3, col 2
    },
    description: "To‘g‘ri javoblar (rowIndex_colIndex formatida)",
  })
  @IsOptional()
  @IsObject()
  answers?: Record<string, string>;
}
