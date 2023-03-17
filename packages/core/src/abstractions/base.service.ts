import { BaseRepository } from './base.repository';
import { IBaseRequest, ICondition, IListResponseDto } from '../models';
import { JwtUser } from '../guards';
import { cloneInstance } from '../utils';

export abstract class BaseService<T, ID> {
  protected constructor(protected repository: BaseRepository<T, ID>) {}

  async findAll(req: IBaseRequest, loggedUser?: JwtUser): Promise<IListResponseDto<T>> {
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

  async findOne(id: ID, loggedUser?: JwtUser): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.findOne({ condition });
  }

  async create(entity: Partial<T>, loggedUser?: JwtUser): Promise<T> {
    const processEntity: Partial<T> = cloneInstance(entity);
    if (loggedUser) {
      Object.assign(processEntity, {
        createdBy: loggedUser.userId,
        updatedBy: loggedUser.userId,
      });
    }
    return this.repository.create(processEntity);
  }

  async update(id: ID, entity: Partial<T>, loggedUser?: JwtUser): Promise<T> {
    const condition: ICondition = { id };
    const processEntity: Partial<T> = cloneInstance(entity);
    if (loggedUser) {
      Object.assign(processEntity, { updatedBy: loggedUser.userId });
    }
    return this.repository.update(condition, processEntity);
  }

  async delete(id: ID, loggedUser?: JwtUser): Promise<T> {
    const condition: ICondition = { id };
    return this.repository.delete(condition, { userId: loggedUser?.userId });
  }
}
