import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AdminType } from '../model/admin.entity';

export class UpdateAdminDto {
  @ApiProperty({ required: false })
  full_name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  phone_number?: string;

  @ApiProperty({ enum: AdminType, required: false })
  type?: AdminType;
}