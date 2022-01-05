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

  findMany(filter: FindManyOptions<Entity> = {}) {
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
      const relateItem = await relateRepository.findOneItem({
        where: {
          id: relationEntityId,
        },
        relations: [field.toString()],
      });
      console.log(relateItem);
      const createdItem = await this.create(item);
      // @ts-ignore
      if (!relateItem[field]) relateItem[field] = [];
      // @ts-ignore
      relateItem[field].push(createdItem);
      const savedResult = await relateItem.save();
      return savedResult;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('unable to create this item');
    }
  }

  async updateParent<Parent extends BaseEntity>(
    id: string,
    oldParentId: string,
    newParentId: string,
    parentField: keyof Parent,
    parentRepository: BaseRepository<Parent>,
  ) {
    const oldParentItem = await parentRepository.findOne({
      where: {
        id: oldParentId,
      },
      relations: [parentField.toString()],
    });

    const newParentItem = await parentRepository.findOne({
      where: {
        id: newParentId,
      },
      relations: [parentField.toString()],
    });
    //@ts-ignore
    const item = oldParentItem[parentField].filter(
      (entry: Entity) => entry.id === id,
    )[0];

    //@ts-ignore
    if (!newParentItem[parentField]) newParentItem[parentField] = [];

    //@ts-ignore
    newParentItem[parentField].push(item);

    oldParentItem.save();
    return newParentItem.save();
  }
}
