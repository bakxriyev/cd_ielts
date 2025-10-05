import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ReadingAnswersService } from "./reading_answers.service";
import { CreateReadingAnswerDto, UpdateReadingAnswerDto } from "./dto";

@ApiTags("Reading Answers")
@Controller("reading-answers")
export class ReadingAnswersController {
  constructor(private readonly service: ReadingAnswersService) {}

  @Post()
  @ApiOperation({ summary: "Create new answer" })
  @ApiResponse({ status: 201, description: "Answer created" })
  create(@Body() dto: CreateReadingAnswerDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all answers" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get answer by ID" })
  @ApiParam({ name: "id", type: "string", example: "ANS000001" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update answer (is_correct auto recalculated)" })
  @ApiParam({ name: "id", type: "string", example: "ANS000001" })
  update(@Param("id") id: string, @Body() dto: UpdateReadingAnswerDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete answer" })
  @ApiParam({ name: "id", type: "string", example: "ANS000001" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
