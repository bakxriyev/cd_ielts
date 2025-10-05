import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { LQuestionService } from "./l_questions.service";
import { CreateLQuestionDto, UpdateLQuestionDto } from "./dto";
import { LQuestion } from "./entities/l_question.entity";

const photoFileOptions = {
  storage: diskStorage({
    destination: "./uploads/l_questions",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
};

@ApiTags("Listening SubQuestions")
@Controller("l-questions")
export class LQuestionController {
  constructor(private readonly service: LQuestionService) {}

  // CREATE
  @Post()
  @UseInterceptors(FileInterceptor("photo", photoFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateLQuestionDto })
  @ApiResponse({ status: 201, description: "SubQuestion created", type: LQuestion })
  async create(
    @Body() dto: CreateLQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<LQuestion> {
    return this.service.create({
      ...dto,
      photo: file ? file.filename : null, // faqat fayl bo‘lsa yozadi
    });
  }

  // GET ALL
  @Get()
  @ApiResponse({ status: 200, description: "Get all subquestions", type: [LQuestion] })
  findAll(): Promise<LQuestion[]> {
    return this.service.findAll();
  }

  // GET ONE
  @Get(":id")
  @ApiResponse({ status: 200, description: "Get one subquestion by ID", type: LQuestion })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<LQuestion> {
    return this.service.findOne(id);
  }

  // UPDATE
  @Put(":id")
  @UseInterceptors(FileInterceptor("photo", photoFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateLQuestionDto })
  @ApiResponse({ status: 200, description: "SubQuestion updated", type: LQuestion })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateLQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<LQuestion> {
    return this.service.update(id, {
      ...dto,
      // agar yangi fayl bo‘lsa yoziladi, bo‘lmasa eski rasm turadi
      photo: file ? file.filename : undefined,
    });
  }

  // DELETE
  @Delete(":id")
  @ApiResponse({ status: 200, description: "SubQuestion deleted" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
