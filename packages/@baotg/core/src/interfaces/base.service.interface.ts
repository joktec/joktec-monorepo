import { BaseConditionInput, BasePaginationInput } from '../inputs';
import { ListQuery, Query } from '../utils/express';
export interface IBaseService<
  T,
  CONDITION extends BaseConditionInput = BaseConditionInput,
  PAGINATION extends BasePaginationInput = BasePaginationInput,
> {
  // tslint:disable-next-line:no-method-signature
  findAll(listQuery?: ListQuery): Promise<readonly T[]>;
  query(condition: CONDITION, pagination: PAGINATION): Promise<readonly T[]>;

  // tslint:disable-next-line:no-method-signature
  count(listQuery?: ListQuery): Promise<number>;
  // tslint:disable-next-line:no-method-signature
  findById(id: any, query?: Query): Promise<T>;
  // tslint:disable-next-line:no-method-signature
  findOne(condition: any, query?: Query): Promise<T>;
  // tslint:disable-next-line:no-method-signature
  create(payload: any): Promise<T>;
  // tslint:disable-next-line:no-method-signature
  update(id: string, payload: any): Promise<T>;
  // tslint:disable-next-line:no-method-signature
  remove(id: string): Promise<T>;
}
