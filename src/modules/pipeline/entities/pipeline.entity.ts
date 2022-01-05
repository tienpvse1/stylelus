import { BaseEntity } from 'src/base/entity.base';
import { PipelineColumn } from 'src/modules/pipeline-column/entities/pipeline-column.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'pipeline' })
export class Pipeline extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(
    () => PipelineColumn,
    (pipelineColumn) => pipelineColumn.pipeline,
    { eager: true },
  )
  pipelineColumns: PipelineColumn[];
}
