import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AdminService } from "../admin/admin.service";
import { ClientService } from "../client/client.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
    private readonly clientService: ClientService
  ) {}

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

  async loginAdmin(dto: LoginDto) {
    const admin = await this.adminService.findByEmail(dto.email);
    if (!admin || admin.password !== dto.password) {
      throw new UnauthorizedException("Admin not found or wrong password");
    }

    const tokens = this.generateTokens({ email: admin.email, sub: admin.id, role: "admin" });
    await this.adminService.updateRefreshToken(admin.id, tokens.refreshToken);

    return { ...tokens, admin };
  }

  async loginClient(dto: LoginDto) {
    const client = await this.clientService.findByEmail(dto.email);
    if (!client || client.password !== dto.password) {
      throw new UnauthorizedException("Client not found or wrong password");
    }

    const tokens = this.generateTokens({ email: client.email, sub: client.id, role: "client" });
    await this.clientService.updateRefreshToken(client.id, tokens.refreshToken);

    return { ...tokens, client };
  }
}
