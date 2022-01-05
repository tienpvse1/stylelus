import { Module } from '@nestjs/common';
import { PipelineItemService } from './pipeline-item.service';
import { PipelineItemController } from './pipeline-item.controller';

@Module({
  controllers: [PipelineItemController],
  providers: [PipelineItemService]
})
export class PipelineItemModule {}
