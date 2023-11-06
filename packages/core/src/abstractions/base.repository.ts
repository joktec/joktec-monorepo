import { DeepPartial, Entity, IBaseRequest, ICondition } from '../models';

export interface BaseReadRepository<T extends Entity, ID> {
  find(query: IBaseRequest<T>): Promise<T[]>;

  count(query: IBaseRequest<T>): Promise<number>;

  findOne(query: IBaseRequest<T>): Promise<T>;
}

export interface BaseRepository<T extends Entity, ID> extends BaseReadRepository<T, ID> {
  create(body: DeepPartial<T>): Promise<T>;

  update(condition: ICondition<T>, body: DeepPartial<T>): Promise<T>;

  delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: any }): Promise<T>;

  restore(condition: ICondition<T>, opts?: { userId?: any }): Promise<T>;
}
