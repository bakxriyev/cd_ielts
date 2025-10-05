import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from './dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  create(dto: CreateAdminDto) {
    return this.adminModel.create(dto);
  }

  findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await admin.update(dto);
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: 'Admin deleted successfully' };
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, token: string | null): Promise<void> {
    const admin = await this.findOne(id);
    if (admin) {
      (admin as any).refreshToken = token; // Agar modelda refreshToken column bo'lsa
      await admin.save();
    }
  }
}
