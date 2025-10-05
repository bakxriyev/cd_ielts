import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin/login")
  @ApiOperation({ summary: "Admin login" })
  async loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto);
  }

  @Post("client/login")
  @ApiOperation({ summary: "Client login" })
  async loginClient(@Body() dto: LoginDto) {
    return this.authService.loginClient(dto);
  }
}
