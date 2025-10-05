import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
