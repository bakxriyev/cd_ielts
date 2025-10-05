import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";
import { RQuestionService } from "./reading_subquestions.service";
import { CreateRQuestionDto } from "./dto/create-reading_subquestion.dto";
import { UpdateRQuestionDto } from "./dto/update-reading_subquestion.dto";
import { ReadingQuestionType, RQuestion } from "./model/reading_subquestion.entity";

@ApiTags("Reading SubQuestions")
@Controller("r-questions")
export class RQuestionController {
  constructor(private readonly rQuestionService: RQuestionService) {}

  @ApiConsumes("application/json")
@Post()
@ApiBody({ type: CreateRQuestionDto })
create(@Body() dto: CreateRQuestionDto) {
  return this.rQuestionService.create(dto);
}


  @Get()
  @ApiOperation({ summary: "Get all subquestions" })
  @ApiResponse({ status: 200, type: [RQuestion] })
  findAll() {
    return this.rQuestionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one subquestion by ID" })
  @ApiResponse({ status: 200, type: RQuestion })
  findOne(@Param("id") id: string) {
    return this.rQuestionService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update subquestion by ID" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateRQuestionDto })
  update(@Param("id") id: string, @Body() dto: UpdateRQuestionDto) {
    return this.rQuestionService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete subquestion by ID" })
  remove(@Param("id") id: string) {
    return this.rQuestionService.remove(+id);
  }
}
