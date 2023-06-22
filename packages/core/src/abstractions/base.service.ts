import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IListResponseDto } from '../models';
import { JwtPayload } from '../guards';
import { cloneInstance } from '../utils';

export abstract class BaseService<T extends Record<string, any>, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(query: IBaseRequest<T>, payload?: JwtPayload): Promise<IListResponseDto<T>> {
    const [items, totalItems] = await Promise.all([this.repository.find(query), this.repository.count(query)]);
    return {
      items,
      totalItems,
      totalPage: Math.ceil(totalItems / query.limit),
      isLastPage: items.length < query.limit,
    };
  }

  async find(query: IBaseRequest<T>, payload?: JwtPayload): Promise<T[]> {
    return this.repository.find(query);
  }

  async findOne(id: ID, query: IBaseRequest<T> = {}, payload?: JwtPayload): Promise<T> {
    query.condition = { id };
    return this.repository.findOne(query);
  }

  async create(entity: Partial<T>, payload?: JwtPayload): Promise<T> {
    const processEntity: Partial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { createdBy: payload.sub, updatedBy: payload.sub });
    }
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: Partial<T>, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id };
    const processEntity: Partial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { updatedBy: payload.sub });
    }
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id };
    return this.repository.delete(condition, { userId: payload?.sub });
  }
}
