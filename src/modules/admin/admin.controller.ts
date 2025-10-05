import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminService.remove(+id);
  }
}
