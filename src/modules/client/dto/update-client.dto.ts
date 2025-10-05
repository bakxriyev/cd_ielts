import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ required: false })
  @IsOptional()
  full_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  logo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  balance?: number;
}
