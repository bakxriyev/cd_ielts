import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ListeningQuestionService } from "./listening_question.service";
import { CreateListeningQuestionDto, UpdateListeningQuestionDto } from "./dto";
import { ListeningQuestion } from "./entities/listening_question.entity";
import { audioFileOptions } from "./diskStrotage";

@ApiTags("Listening Questions")
@Controller("listening-questions")
export class ListeningQuestionController {
  constructor(private readonly service: ListeningQuestionService) {}

  @Post()
  @UseInterceptors(FileInterceptor("audio", audioFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateListeningQuestionDto })
  async create(
    @Body() body: CreateListeningQuestionDto,
    @UploadedFile() audio?: Express.Multer.File,
  ) {
    const listeningId = Number(body.listening_id);
    if (isNaN(listeningId)) {
      throw new BadRequestException("listening_id must be a number");
    }

    return this.service.create(
      {
        ...body,
        listening_id: listeningId,
      },
      audio?.filename,
    );
  }

  @Get()
  findAll(): Promise<ListeningQuestion[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ListeningQuestion> {
    return this.service.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("audio", audioFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateListeningQuestionDto })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateListeningQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ListeningQuestion> {
    return this.service.update(id, dto, file?.filename);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
