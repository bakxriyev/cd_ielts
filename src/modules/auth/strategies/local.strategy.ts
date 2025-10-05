// LocalStrategy.ts
import { Strategy as LocalStrategyBase } from "passport-local"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../auth.service"


@Injectable()
export class LocalStrategy extends PassportStrategy(LocalStrategyBase) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" })
  }

 
}
