import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { OtpService } from "../otp/otp.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService
  ) {}

  // ========= LOGINLAR ==========
  @Post("admin/login")
  @ApiOperation({ summary: "Admin login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli tizimga kirdi" })
  @ApiResponse({ status: 401, description: "Login yoki parol xato" })
  async loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post("client/login")
  @ApiOperation({ summary: "Client login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Client muvaffaqiyatli tizimga kirdi" })
  @ApiResponse({ status: 401, description: "Login yoki parol xato" })
  async loginClient(@Body() dto: LoginDto) {
    return this.authService.loginClient(dto);
  }

  // ========= OTP ADMIN ==========
  @Post("admin/send-otp")
  @ApiOperation({ summary: "Admin uchun OTP yuborish (email orqali)" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "admin@gmail.com" },
      },
      required: ["email"],
    },
  })
  @ApiResponse({ status: 200, description: "OTP muvaffaqiyatli yuborildi" })
  @ApiResponse({ status: 400, description: "Bunday email topilmadi" })
  async sendAdminOtp(@Body("email") email: string) {
    return this.otpService.sendOtp(email, "admin");
  }

  @Post("admin/verify-otp")
  @ApiOperation({ summary: "Admin OTP tekshirish va yangi parolni o‘rnatish" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "admin@gmail.com" },
        code: { type: "string", example: "483920" },
        newPassword: { type: "string", example: "newStrongPassword123" },
      },
      required: ["email", "code", "newPassword"],
    },
  })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli o‘zgartirildi" })
  @ApiResponse({ status: 400, description: "OTP noto‘g‘ri yoki eskirgan" })
  async verifyAdminOtp(
    @Body() body: { email: string; code: string; newPassword: string }
  ) {
    return this.otpService.verifyOtp(body.email, body.code, body.newPassword, "admin");
  }

  // ========= OTP CLIENT ==========
  @Post("client/send-otp")
  @ApiOperation({ summary: "Client uchun OTP yuborish (email orqali)" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "client@gmail.com" },
      },
      required: ["email"],
    },
  })
  @ApiResponse({ status: 200, description: "OTP muvaffaqiyatli yuborildi" })
  @ApiResponse({ status: 400, description: "Bunday email topilmadi" })
  async sendClientOtp(@Body("email") email: string) {
    return this.otpService.sendOtp(email, "client");
  }

  @Post("client/verify-otp")
  @ApiOperation({ summary: "Client OTP tekshirish va yangi parolni o‘rnatish" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "client@gmail.com" },
        code: { type: "string", example: "957612" },
        newPassword: { type: "string", example: "newPassword123" },
      },
      required: ["email", "code", "newPassword"],
    },
  })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli o‘zgartirildi" })
  @ApiResponse({ status: 400, description: "OTP noto‘g‘ri yoki eskirgan" })
  async verifyClientOtp(
    @Body() body: { email: string; code: string; newPassword: string }
  ) {
    return this.otpService.verifyOtp(body.email, body.code, body.newPassword, "client");
  }
}
