import { Controller, Get, Post, Param, Body, Query, Delete, Put, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { ResultService } from "./result.service";
import { UpdateResultDto } from "./dto";

@ApiTags("Results")
@Controller("results")
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post("calculate/:user_id/:exam_id")
  @ApiOperation({ summary: "Calculate and store IELTS result for a specific user" })
  @ApiParam({ name: "user_id", type: String })
  @ApiParam({ name: "exam_id", type: Number })
  async calculateUser(
    @Param("user_id") user_id: string,
    @Param("exam_id", ParseIntPipe) exam_id: number
  ) {
    return this.resultService.calculateUserResult(user_id, exam_id);
  }

  @Post("calculate-all")
  @ApiOperation({ summary: "Calculate and store IELTS results for all users" })
  async calculateAll() {
    return this.resultService.calculateAllResults();
  }

  @Get()
  @ApiOperation({ summary: "Get all results with user info" })
  async findAll() {
    return this.resultService.findAll();
  }

  @Get("user/:user_id")
  @ApiOperation({ summary: "Get detailed results and all answers of a specific user" })
  @ApiParam({ name: "user_id", type: String })
  async findByUser(@Param("user_id") user_id: string) {
    return this.resultService.findByUserId(user_id);
  }

  @Get("by-date")
  @ApiOperation({ summary: "Get results filtered by date" })
  @ApiQuery({ name: "date", type: String, example: "2025-09-27" })
  async findByDate(@Query("date") date: string) {
    return this.resultService.findByDate(date);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update result manually" })
  @ApiParam({ name: "id", type: Number })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateResultDto) {
    return this.resultService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete result" })
  @ApiParam({ name: "id", type: Number })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.resultService.remove(id);
  }
}
