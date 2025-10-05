import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFile, UseInterceptors } from "@nestjs/common"
import { ReadingService } from "./reading.service"
import { CreateReadingDto } from "./dto/create-reading"
import { UpdateReadingDto } from "./dto/update-rading"
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger"
import { FileInterceptor } from "@nestjs/platform-express"

@ApiTags("Reading")

@Controller("reading")
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @ApiOperation({ summary: "Create new reading passage" })
  create(@Body() dto: CreateReadingDto) {
    return this.readingService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Get all readings" })
  findAll() {
    return this.readingService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "Get reading by ID" })
  findOne(@Param("id") id: number) {
    return this.readingService.findOne(id)
  }

  @Put(":id")
  @ApiOperation({ summary: "Update reading by ID" })
  update(@Param("id") id: number, @Body() dto: UpdateReadingDto) {
    return this.readingService.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete reading by ID" })
  remove(@Param("id") id: number) {
    return this.readingService.remove(id)
  }

}
