import { Injectable } from '@nestjs/common';
import { CreatePipelineItemDto } from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';

@Injectable()
export class PipelineItemService {
  create(createPipelineItemDto: CreatePipelineItemDto) {
    return 'This action adds a new pipelineItem';
  }

  findAll() {
    return `This action returns all pipelineItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipelineItem`;
  }

  update(id: number, updatePipelineItemDto: UpdatePipelineItemDto) {
    return `This action updates a #${id} pipelineItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipelineItem`;
  }
}
