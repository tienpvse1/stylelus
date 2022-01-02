import { nanoid } from 'nanoid';
import {
  BaseEntity as RootBaseEntity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends RootBaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid(10);
  }
}
