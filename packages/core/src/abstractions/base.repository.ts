import { DeepPartial, IBaseRequest, ICondition } from '../models';

export interface BaseReadRepository<T extends object, ID> {
  find(query: IBaseRequest<T>): Promise<T[]>;

  count(query: IBaseRequest<T>): Promise<number>;

  findOne(query: IBaseRequest<T>): Promise<T>;
}

export interface BaseRepository<T extends object, ID> extends BaseReadRepository<T, ID> {
  create(body: DeepPartial<T>): Promise<T>;

  update(condition: ICondition<T>, body: DeepPartial<T>): Promise<T>;

  delete(condition: ICondition<T>, opts?: { force?: boolean; userId?: any }): Promise<T>;
}
