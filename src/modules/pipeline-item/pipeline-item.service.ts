import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/base/base.service';
import { PipelineItem } from './entities/pipeline-item.entity';
import { PipelineItemRepository } from './pipeline-item.repository';

@Injectable()
export class PipelineItemService extends CRUDService<
  PipelineItem,
  PipelineItemRepository
> {}
