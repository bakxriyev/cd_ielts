import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
  ) {}

  async create(dto: CreateUserDto) {
    return this.userRepo.create({ ...dto });
  }

  async findAll() {
    return this.userRepo.findAll({ include: { all: true } });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    return user.update({ ...dto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.destroy();
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.findOne(userId);
    return user.update({ refreshToken });
  }

  async removeRefreshToken(userId: string) {
    const user = await this.findOne(userId);
    return user.update({ refreshToken: null });
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
