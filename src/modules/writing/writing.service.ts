import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Writing } from "./model/writing.model"
import { CreateWritingDto, UpdateWritingDto } from "./dto/"

@Injectable()
export class WritingService {
  constructor(@InjectModel(Writing) private writingRepo: typeof Writing) {}

  async create(dto: CreateWritingDto, file?: Express.Multer.File) {
  return await this.writingRepo.create({
    ...dto,
    task_image: file ? file.filename : null,
    created_at: new Date(),
  });
}


  async findAll() {
    return await this.writingRepo.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    const writing = await this.writingRepo.findByPk(id, { include: { all: true } })
    if (!writing) throw new NotFoundException("Writing not found")
    return writing
  }

  async update(id: number, dto: UpdateWritingDto, file?: Express.Multer.File) {
    const writing = await this.findOne(id)
    await writing.update({
      ...dto,
      task_image: file ? file.filename : writing.task_image
    })
    return writing
  }

  async remove(id: number) {
    const writing = await this.findOne(id)
    await writing.destroy()
    return { message: "Deleted successfully" }
  }
}
