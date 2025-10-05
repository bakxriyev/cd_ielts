import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', {
    storage: diskStorage({
      destination: './uploads/logos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateClientDto })
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateClientDto) {
    if (file) dto.logo = file.filename;
    return this.clientService.create(dto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo', {
    storage: diskStorage({
      destination: './uploads/logos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateClientDto })
  update(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Body() dto: UpdateClientDto) {
    if (file) dto.logo = file.filename;
    return this.clientService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(+id);
  }
}
