import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: "Ali Valiyev", description: "User full name" })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({ example: "ali@gmail.com", description: "User email" })
  @IsOptional()
  @IsEmail()
  email: string

  @ApiProperty({ example: "ali123", description: "Unique username" })
  @IsOptional()
  @IsString()
  username: string

  @ApiProperty({ example: "12345", description: "User password" })
  @IsOptional()
  @IsString()
  password: string

  @ApiProperty({ example: "RIE", description: "User location" })
  @IsString()
  @IsOptional()
  location?: string;
}
