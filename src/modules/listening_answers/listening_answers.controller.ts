import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { ListeningAnswerService } from "./listening_answers.service";
import { CreateListeningAnswerDto, UpdateListeningAnswerDto } from "./dto";
import { ListeningAnswer } from "./entities/listening_answer.entity";

@ApiTags("Listening Answers")
@Controller("listening-answers")
export class ListeningAnswerController {
  constructor(private readonly service: ListeningAnswerService) {}

  // ✅ CREATE
  @Post()
  @ApiOperation({ summary: "Create new listening answer" })
  @ApiBody({ type: CreateListeningAnswerDto })
  @ApiResponse({
    status: 201,
    description: "Listening answer successfully created",
    type: ListeningAnswer,
  })
  async create(@Body() dto: CreateListeningAnswerDto) {
    return this.service.create(dto); // ❗️oldingi ...dto xato edi
  }

  // ✅ FIND ALL
  @Get()
  @ApiOperation({ summary: "Get all listening answers" })
  @ApiResponse({
    status: 200,
    description: "List of all listening answers",
    type: [ListeningAnswer],
  })
  async findAll() {
    return this.service.findAll();
  }

  // ✅ FIND ONE
  @Get(":id")
  @ApiOperation({ summary: "Get listening answer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listening answer ID" })
  @ApiResponse({
    status: 200,
    description: "Listening answer details",
    type: ListeningAnswer,
  })
  @ApiResponse({ status: 404, description: "Listening answer not found" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ✅ UPDATE
  @Put(":id")
  @ApiOperation({ summary: "Update listening answer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listening answer ID" })
  @ApiBody({ type: UpdateListeningAnswerDto })
  @ApiResponse({
    status: 200,
    description: "Listening answer successfully updated",
    type: ListeningAnswer,
  })
  @ApiResponse({ status: 404, description: "Listening answer not found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateListeningAnswerDto,
  ) {
    return this.service.update(id, dto);
  }

  // ✅ DELETE
  @Delete(":id")
  @ApiOperation({ summary: "Delete listening answer by ID" })
  @ApiParam({ name: "id", type: Number, description: "Listening answer ID" })
  @ApiResponse({ status: 200, description: "Listening answer deleted successfully" })
  @ApiResponse({ status: 404, description: "Listening answer not found" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
