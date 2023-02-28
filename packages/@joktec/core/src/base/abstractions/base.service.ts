import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IListResponseDto } from '../models';

export abstract class BaseService<T, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(req: IBaseRequest): Promise<IListResponseDto<T>> {
    const overrideReq: IBaseRequest = {
      condition: req?.condition || {},
      page: req?.page ?? 1,
      limit: req?.limit ?? 20,
      sort: req?.sort || { id: 'asc' },
      ...req,
    };

    const [items, totalItems] = await Promise.all([
      this.repository.find(overrideReq),
      this.repository.count(overrideReq),
    ]);

    return {
      items,
      totalItems,
      page: overrideReq.page,
      pageSize: overrideReq.limit,
      totalPage: Math.ceil(totalItems / overrideReq.limit),
      isLastPage: items.length < overrideReq.limit,
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
    return this.repository.update({ condition }, entity);
  }

  async delete(id: ID): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.delete({ condition });
  }
}
