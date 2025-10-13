import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AdminService } from "../admin/admin.service";
import { ClientService } from "../client/client.service";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly userService: UserService
  ) {}

  // 🔑 Tokenlar yaratish
  private generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN"),
    });

    return { accessToken, refreshToken };
  }

  // 🧑‍💼 Admin login
  async loginAdmin(dto: LoginDto) {
    const admin = await this.adminService.findByEmail(dto.email);
    if (!admin || admin.password !== dto.password) {
      throw new UnauthorizedException("Admin not found or wrong password");
    }

    const tokens = this.generateTokens({ email: admin.email, sub: admin.id, role: "admin" });
    await this.adminService.updateRefreshToken(admin.id, tokens.refreshToken);
    return { ...tokens, admin };
  }

  // 👩‍💻 Client login
  async loginClient(dto: LoginDto) {
    const client = await this.clientService.findByEmail(dto.email);
    if (!client || client.password !== dto.password) {
      throw new UnauthorizedException("Client not found or wrong password");
    }

    const tokens = this.generateTokens({ email: client.email, sub: client.id, role: "client" });
    await this.clientService.updateRefreshToken(client.id, tokens.refreshToken);
    return { ...tokens, client };
  }

  // 👤 User ro‘yxatdan o‘tish
  async registerUser(dto: CreateUserDto) {
    const existingUser = await this.userService.findByUsername(dto.username);
    if (existingUser) {
      throw new BadRequestException("Username already taken");
    }

    const newUser = await this.userService.create(dto);

    const tokens = this.generateTokens({
      username: newUser.username,
      sub: newUser.id,
      role: "user",
    });

    await this.userService.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { ...tokens, user: newUser };
  }

  // 🔐 User login (username + password orqali)
  async loginUser(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException("Wrong username or password");
    }

    const tokens = this.generateTokens({
      username: user.username,
      sub: user.id,
      role: "user",
    });

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}
