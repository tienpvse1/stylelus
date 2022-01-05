import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PipelineItemService } from './pipeline-item.service';
import { CreatePipelineItemDto } from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { PipelineRepository } from '../pipeline/pipeline.repository';

@Controller('pipeline-item')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline item')
export class PipelineItemController {
  constructor(private readonly pipelineItemService: PipelineItemService) {}

  @Post()
  create(@Body() createPipelineItemDto: CreatePipelineItemDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );

    const { name, pipelineColumnId } = createPipelineItemDto;

    return this.pipelineItemService.addWithRelation<PipelineColumn>(
      { name },
      pipelineColumnId,
      pipelineColumnRepository,
      'pipelineItems',
    );
  }

  @Get()
  findAll() {
    return this.pipelineItemService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineItemService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineItemDto: UpdatePipelineItemDto,
  ) {
    return this.pipelineItemService.update(id, updatePipelineItemDto);
  }
  @Patch('parent/:id')
  updateParent(
    @Param('id') id: string,
    @Query('oldId') oldId: string,
    @Query('newId') newId: string,
  ) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );

    return this.pipelineItemService.updateParent<PipelineColumn>(
      id,
      'pipelineColumn',
      oldId,
      newId,
      'pipelineItems',
      pipelineColumnRepository,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineItemService.delete(id);
  }
}
