import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Put } from '@nestjs/common';
import { PassagesService } from './passages.service';
import { CreatePassageDto, UpdatePassageDto } from './dto';
import { Passage } from './model/passage.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('passages') 
@Controller('passages')
export class PassagesController {
  constructor(private readonly passagesService: PassagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new passage' })
  @ApiBody({ type: CreatePassageDto })
  @ApiResponse({ status: 201, description: 'Passage created successfully', type: Passage })
  create(@Body() createPassageDto: CreatePassageDto): Promise<Passage> {
    return this.passagesService.create(createPassageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all passages' })
  @ApiResponse({ status: 200, description: 'List of passages', type: [Passage] })
  findAll(): Promise<Passage[]> {
    return this.passagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a passage by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Passage found', type: Passage })
  @ApiResponse({ status: 404, description: 'Passage not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Passage> {
    return this.passagesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a passage by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePassageDto })
  @ApiResponse({ status: 200, description: 'Passage updated', type: Passage })
  @ApiResponse({ status: 404, description: 'Passage not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassageDto: UpdatePassageDto,
  ): Promise<Passage> {
    return this.passagesService.update(id, updatePassageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a passage by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Passage deleted' })
  @ApiResponse({ status: 404, description: 'Passage not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.passagesService.remove(id);
  }
}
