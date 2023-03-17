import { IBaseRequest, ICondition } from '../models';

export interface BaseReadRepository<T, ID> {
  find(query: IBaseRequest): Promise<T[]>;

  count(query: IBaseRequest): Promise<number>;

  findOne(query: IBaseRequest): Promise<T>;
}

export interface BaseRepository<T, ID> extends BaseReadRepository<T, ID> {
  create(body: Partial<T>): Promise<T>;

  update(condition: ICondition, body: Partial<T>): Promise<T>;

  delete(condition: ICondition, opts?: { force?: boolean; userId?: any }): Promise<T>;
}
