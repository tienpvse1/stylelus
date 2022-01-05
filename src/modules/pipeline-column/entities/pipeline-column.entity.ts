import { BaseEntity } from 'src/base/entity.base';
import { PipelineItem } from 'src/modules/pipeline-item/entities/pipeline-item.entity';
import { Pipeline } from 'src/modules/pipeline/entities/pipeline.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'pipeline-column' })
export class PipelineColumn extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineColumns)
  @JoinColumn({ name: 'pipeline_id' })
  pipeline: Pipeline;

  @OneToMany(() => PipelineItem, (pipelineItem) => pipelineItem.pipelineColumn)
  pipelineItems: PipelineItem[];
}
