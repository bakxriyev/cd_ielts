import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "nimadur", description: "username" })
  @IsOptional()
  username: string;

  @ApiProperty({ example: "12345678", description: "Password" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsOptional()
  @IsEmail()
  email: string;

}
