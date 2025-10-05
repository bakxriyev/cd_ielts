import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  logo?: any;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ default: 0 })
  @IsOptional()
  balance?: number;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  mock_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
}
