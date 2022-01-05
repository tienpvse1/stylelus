import { BadRequestException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
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

  paginate(filter: FindManyOptions<Entity>, num: number, size: number) {
    return paginate<Entity>(
      this.repository,
      {
        page: num,
        limit: size,
      },
      filter,
    );
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

  // create item with its relate entity
  // ie: user add a book, so user is the relate entity of book
  async addWithRelation<RelationEntity extends BaseEntity>(
    item: DeepPartial<Entity>,
    relationEntityId: string,
    relateRepository: BaseRepository<RelationEntity>,
    field: keyof RelationEntity,
  ) {
    try {
      const createdItem = await this.create(item);
      const relateItem = await relateRepository.findById(relationEntityId);
      // @ts-ignore
      relateItem[field] = createdItem;
      const savedResult = await relateItem.save();
      return savedResult;
    } catch (error) {
      throw new BadRequestException('unable to create this item');
    }
  }
}
