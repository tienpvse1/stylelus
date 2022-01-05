import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { FindManyOptions } from 'typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('pipeline')
@ApiBearerAuth('Authorization')
@ApiTags('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelineService.create(createPipelineDto);
  }

  @Get()
  findAll(@Body() filter: FindManyOptions<Pipeline>) {
    return this.pipelineService.findMany(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(id, updatePipelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineService.delete(id);
  }
}
