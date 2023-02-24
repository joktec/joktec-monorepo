import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IPageableResponse } from '../models';

export abstract class BaseService<T, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async pageable(req: IBaseRequest): Promise<IPageableResponse<T>> {
    const overrideReq: IBaseRequest = {
      condition: req.condition || {},
      page: req.page ?? 1,
      limit: req.limit ?? 20,
      sort: req.sort || { id: 'asc' },
      ...req,
    };
    return this.repository.pageable(overrideReq);
  }

  async findAll(req: IBaseRequest): Promise<T[]> {
    const overrideReq: IBaseRequest = { condition: req.condition || {}, ...req };
    return this.repository.find(overrideReq);
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

  async delete(id: ID): Promise<number> {
    const condition: ICondition = { id };
    return this.repository.delete({ condition });
  }
}
