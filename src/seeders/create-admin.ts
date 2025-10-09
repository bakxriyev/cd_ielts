import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../modules/admin/model/admin.entity';
import { AdminType } from '../modules/admin/model/admin.entity';

@Injectable()
export class AdminSeed implements OnModuleInit {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
  ) {}
  async onModuleInit() {
    // Superadmin mavjudligini tekshiramiz
    const exist = await this.adminModel.findOne({
      where: { email: 'shjurayew@gmail.com' },
    });
    if (!exist) {
      await this.adminModel.create({
        full_name: "Shahriyor Jo'rayev",
        email: "shjurayew@gmail.com",
        password: "jorayevsh",
        phone_number: '+998940220755',
        type: AdminType.SUPERADMIN,
      });
      console.log('✅ Superadmin muvaffaqiyatli yaratildi');
    } else {
      console.log('⚠️ Superadmin allaqachon mavjud');
    }
  }
}