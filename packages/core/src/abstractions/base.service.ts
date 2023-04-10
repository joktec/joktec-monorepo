import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IListResponseDto } from '../models';
import { JwtPayload } from '../guards';
import { cloneInstance } from '../utils';

export abstract class BaseService<T, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(req: IBaseRequest, payload?: JwtPayload): Promise<IListResponseDto<T>> {
    const [items, totalItems] = await Promise.all([this.repository.find(req), this.repository.count(req)]);
    return {
      items,
      totalItems,
      totalPage: Math.ceil(totalItems / req.limit),
      isLastPage: items.length < req.limit,
    };
  }

  async findOne(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.findOne({ condition });
  }

  async create(entity: Partial<T>, payload?: JwtPayload): Promise<T> {
    const processEntity: Partial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { createdBy: payload.userId, updatedBy: payload.userId });
    }
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: Partial<T>, payload?: JwtPayload): Promise<T> {
    const condition: ICondition = { id };
    const processEntity: Partial<T> = cloneInstance(entity);
    if (payload) {
      Object.assign(processEntity, { updatedBy: payload.userId });
    }
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID, payload?: JwtPayload): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.delete(condition, { userId: payload?.userId });
  }
}
