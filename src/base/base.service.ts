import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './base.repository';
import { BaseEntity } from './entity.base';

export class CRUDService<
  Entity extends BaseEntity,
  Repository extends BaseRepository<Entity>,
> {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  create(item: DeepPartial<Entity>) {
    return this.repository.createItem(item);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  findOne(filter: FindOneOptions<Entity>) {
    return this.repository.findOneItem(filter);
  }

  findOneWithoutError(filter: FindOneOptions<Entity>) {
    return this.repository.findOne(filter);
  }

  findMany(filter: FindManyOptions<Entity>) {
    return this.repository.findMany(filter);
  }

  delete(id: string) {
    return this.repository.deleteItem(id);
  }

  permanentDelete(id: string) {
    return this.repository.permanentDelete(id);
  }

  update(id: string, item: QueryDeepPartialEntity<Entity>) {
    return this.repository.updateItem(id, item);
  }
}
