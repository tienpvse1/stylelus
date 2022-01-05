import { BaseEntity } from 'src/base/entity.base';
import { Pipeline } from 'src/modules/pipeline/entities/pipeline.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm';

@Entity({ name: 'pipeline-column' })
export class PipelineColumn extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineColumns)
  @JoinColumn({ name: 'pipeline_id' })
  pipeline: Pipeline;
}
