import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AdminType } from '../model/admin.entity';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

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

  @ApiProperty({ enum: AdminType, required: false })
  @IsEnum(AdminType)
  type?: AdminType;
}

