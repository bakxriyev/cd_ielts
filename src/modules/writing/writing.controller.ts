import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { WritingService } from "./writing.service";
import { CreateWritingDto, UpdateWritingDto } from "./dto";
import * as fs from "fs";
import * as path from "path";

@ApiTags("Writing")
@Controller("writing")
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  private static ensureUploadDir() {
    const dir = path.join(process.cwd(), "uploads/writing");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("task_image", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          WritingController.ensureUploadDir();
          cb(null, "./uploads/writing");
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + "-" + file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateWritingDto })
  create(@Body() dto: CreateWritingDto, @UploadedFile() file: Express.Multer.File) {
    return this.writingService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.writingService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.writingService.findOne(+id);
  }

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("task_image", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          WritingController.ensureUploadDir();
          cb(null, "./uploads/writing");
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + "-" + file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateWritingDto })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateWritingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.writingService.update(+id, dto, file);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.writingService.remove(+id);
  }
}
