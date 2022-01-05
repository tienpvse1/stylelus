import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PipelineItemService } from './pipeline-item.service';
import { CreatePipelineItemDto } from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';

@Controller('pipeline-item')
export class PipelineItemController {
  constructor(private readonly pipelineItemService: PipelineItemService) {}

  @Post()
  create(@Body() createPipelineItemDto: CreatePipelineItemDto) {
    return this.pipelineItemService.create(createPipelineItemDto);
  }

  @Get()
  findAll() {
    return this.pipelineItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipelineItemDto: UpdatePipelineItemDto) {
    return this.pipelineItemService.update(+id, updatePipelineItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineItemService.remove(+id);
  }
}
