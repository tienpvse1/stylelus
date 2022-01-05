import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getCustomRepository } from 'typeorm';
import { PipelineRepository } from '../pipeline/pipeline.repository';
import { UpdatePipelineColumnDto } from './dto/update-pipeline-column.dto';
import { PipelineColumnService } from './pipeline-column.service';

@Controller('pipeline-column')
@ApiTags('pipeline columns')
@ApiBearerAuth('Authorization')
export class PipelineColumnController {
  constructor(private readonly pipelineColumnService: PipelineColumnService) {}

  @Post()
  create(@Query('name') name: string, @Query('pipelineId') pipelineId: string) {
    const pipelineRepository = getCustomRepository(PipelineRepository);
    return this.pipelineColumnService.addWithRelation(
      { name },
      pipelineId,
      pipelineRepository,
      'pipelineColumns',
    );
  }

  @Get()
  findAll() {
    return this.pipelineColumnService.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineColumnService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineColumnDto: UpdatePipelineColumnDto,
  ) {
    return this.pipelineColumnService.update(id, updatePipelineColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineColumnService.delete(id);
  }
}
