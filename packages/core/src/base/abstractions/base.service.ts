import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IListResponseDto } from '../models';

export abstract class BaseService<T, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(req: IBaseRequest): Promise<IListResponseDto<T>> {
    const [items, totalItems] = await Promise.all([this.repository.find(req), this.repository.count(req)]);

    return {
      items,
      totalItems,
      page: req.page,
      pageSize: req.limit,
      totalPage: Math.ceil(totalItems / req.limit),
      isLastPage: items.length < req.limit,
    };
  }

  async findOne(id: ID): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.findOne({ condition });
  }

  async create(entity: T): Promise<T> {
    return this.repository.create(entity);
  }

  async update(id: ID, entity: T): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.update(condition, entity);
  }

  async delete(id: ID): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.delete(condition);
  }
}
