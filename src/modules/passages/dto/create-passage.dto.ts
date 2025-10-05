import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartEnum, PassageType } from '../model/passage.entity';

export class CreatePassageDto {
  @ApiProperty({
    description: 'Reading modelining ID raqami. Ushbu passage qaysi readingga tegishli ekanini ko‘rsatadi.',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  reading_id: number;

  @ApiProperty({
    description: 'Reading passage matni. Uzoq matnlar (TEXT) formatda yozilishi mumkin.',
    example: `In recent years, there has been a growing interest in renewable energy sources 
such as solar, wind, and hydroelectric power. Governments around the world are investing heavily 
in these technologies to reduce their dependence on fossil fuels and combat climate change. 
This passage discusses how renewable energy can play a vital role in creating a sustainable future.`,
  })
  @IsString()
  @IsNotEmpty()
  reading_text: string;

  @ApiProperty({
    description: 'Reading bo‘limi. Bu enum qiymat bo‘lib, PART1, PART2 yoki PART3 dan biri bo‘ladi.',
    enum: PartEnum,
    example: PartEnum.PART2,
  })
  @IsEnum(PartEnum)
  part: PartEnum;

  @ApiProperty({
    description: 'Passage turi. Default qiymat — "default", lekin "matching" ham bo‘lishi mumkin.',
    enum: PassageType,
    example: PassageType.DEFAULT,
    required: false,
  })
  @IsEnum(PassageType)
  @IsOptional()
  type?: PassageType;
}
