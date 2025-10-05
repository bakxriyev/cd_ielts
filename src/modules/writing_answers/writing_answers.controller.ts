import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { WritingAnswersService } from "./writing_answers.service"
import { CreateWritingAnswerDto, UpdateWritingAnswerDto } from "./dto"

@ApiTags("Writing Answers")
@Controller("writing-answers")
export class WritingAnswersController {
  constructor(private readonly writingAnswersService: WritingAnswersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi writing javob yaratish" })
  @ApiResponse({ status: 201, description: "Writing answer created successfully" })
  create(@Body() dto: CreateWritingAnswerDto) {
    return this.writingAnswersService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Barcha writing javoblarni olish" })
  findAll() {
    return this.writingAnswersService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha writing javobni olish" })
  findOne(@Param("id") id: number) {
    return this.writingAnswersService.findOne(id)
  }

  @Put(":id")
  @ApiOperation({ summary: "Writing javobni yangilash" })
  update(@Param("id") id: number, @Body() dto: UpdateWritingAnswerDto) {
    return this.writingAnswersService.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Writing javobni o‘chirish" })
  remove(@Param("id") id: number) {
    return this.writingAnswersService.remove(id)
  }
}
