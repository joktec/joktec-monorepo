import { JwtPayload } from '../guards';
import { DeepPartial, IBaseRequest, ICondition, IListResponseDto } from '../models';
import { cloneInstance } from '../utils';
import { BaseRepository } from './base.repository';

export abstract class BaseService<T extends Record<string, any>, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(query: IBaseRequest<T>): Promise<IListResponseDto<T>> {
    const [items, totalItems] = await Promise.all([this.repository.find(query), this.repository.count(query)]);
    const totalPage = Math.ceil(totalItems / query.limit);
    const isLastPage = items.length < query.limit;
    return { items, totalItems, totalPage, isLastPage };
  }

  async find(query: IBaseRequest<T>): Promise<T[]> {
    return this.repository.find(query);
  }

  async findById(id: ID, query?: IBaseRequest<T>): Promise<T> {
    const processQuery: IBaseRequest<T> = { ...query, condition: { id } as object };
    return this.repository.findOne(processQuery);
  }

  async findOne(condition: ICondition<T>, query?: IBaseRequest<T>): Promise<T> {
    const processQuery: IBaseRequest<T> = { ...query, condition: { ...query?.condition, ...condition } };
    return this.repository.findOne(processQuery);
  }

  async create(entity: DeepPartial<T>, payload?: JwtPayload): Promise<T> {
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { createdBy: payload.sub, updatedBy: payload.sub });
    }
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: DeepPartial<T>, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    const processEntity: DeepPartial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { updatedBy: payload.sub });
    }
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition<T> = { id } as object;
    return this.repository.delete(condition, { userId: payload?.sub });
  }
}
