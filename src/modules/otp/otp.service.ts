import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Otp } from "./otp.entity";
import { sendEmail } from "../../utils/mail";
import { Admin } from "../admin/model/admin.entity";
import { Client } from "../client/model/client.entity";
import { InjectModel as Inject } from "@nestjs/sequelize";

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    @Inject(Admin) private readonly adminRepo: typeof Admin,
    @Inject(Client) private readonly clientRepo: typeof Client
  ) {}

  private generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali OTP
  }

  async sendOtp(email: string, role: "admin" | "client") {
    let user;

    if (role === "admin") user = await this.adminRepo.findOne({ where: { email } });
    else user = await this.clientRepo.findOne({ where: { email } });

    if (!user) throw new BadRequestException(`${role} not found`);

    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 daqiqa amal qiladi

    await this.otpRepo.create({ email, code, expires_at: expiresAt, role });

    await sendEmail({
      kimga: email,
      mavzu: "REAL EXAM IELTS - Parol tiklash uchun tasdiqlash kodingiz",
      matn: `Sizning kodingiz: ${code}\n\nBu kod 10 daqiqa davomida amal qiladi.`,
    });
    
    return { message: "Tasdiqlash kodi yuborildi", email };
  }

  async verifyOtp(email: string, code: string, newPassword: string, role: "admin" | "client") {
    const otp = await this.otpRepo.findOne({ where: { email, code, role } });
    if (!otp) throw new BadRequestException("Noto‘g‘ri kod");

    if (otp.expires_at < new Date()) {
      await otp.destroy();
      throw new BadRequestException("Kod muddati tugagan");
    }

    // Parolni yangilash
    if (role === "admin") {
      const admin = await this.adminRepo.findOne({ where: { email } });
      admin.password = newPassword; // agar hash ishlatmasangiz to‘g‘ridan-to‘g‘ri
      await admin.save();
    } else {
      const client = await this.clientRepo.findOne({ where: { email } });
      client.password = newPassword;
      await client.save();
    }

    await otp.destroy();
    return { message: "Parol muvaffaqiyatli yangilandi" };
  }
}
