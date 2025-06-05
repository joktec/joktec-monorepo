import { IBaseRequest, ICondition, IPopulate } from '@joktec/core';
import { toArray, toBool } from '@joktec/utils';
import { isNil } from 'lodash';
import {
  And,
  Equal,
  FindManyOptions,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { IMysqlRequest, MysqlModel } from '../models';
import { MysqlException } from '../mysql.exception';

export class MysqlFinder {
  static parsePagination<T>(query: IMysqlRequest<T> = {}): { limit?: number; offset?: number } {
    const limit = typeof query.limit === 'number' && query.limit > 0 ? query.limit : undefined;
    const page = typeof query.page === 'number' && query.page > 0 ? query.page : undefined;
    const offset = typeof query.offset === 'number' && query.offset >= 0 ? query.offset : undefined;

    if (limit && page) return { limit, offset: (page - 1) * limit };
    if (limit) return { limit, offset: offset ?? 0 };
    return {};
  }

  static parseFilter<T>(query: IBaseRequest<T>): FindManyOptions<T> {
    const { condition = {}, keyword } = query;
    const where: FindManyOptions<T>['where'] = MysqlFinder.parseCondition(condition);
    if (keyword && typeof where === 'object') {
      where['name'] = ILike(`%${keyword}%`);
    }
    return { where };
  }

  static parseProjection<T extends MysqlModel>(
    select: string | string[] | Record<string, number | boolean>,
  ): FindManyOptions<T>['select'] {
    if (typeof select === 'object') {
      return Object.entries(select).reduce((acc, [field, direction]) => {
        acc[field] = toBool(direction);
        return acc;
      }, {});
    }

    return toArray(select, { split: ',' }).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
  }

  static parseCondition<T>(condition: ICondition<T>): FindManyOptions<T>['where'] {
    const where: FindManyOptions<T>['where'] = {};

    for (const [key, value] of Object.entries(condition)) {
      if (key === '$and' || key === '$or') {
        where[key === '$and' ? 'AND' : 'OR'] = value.map((c: ICondition<T>) => MysqlFinder.parseCondition(c));
        continue;
      }

      if (isNil(value)) {
        where[key] = IsNull();
        continue;
      }

      if (typeof value === 'object') {
        const conditions: any[] = [];
        for (const [op, val] of Object.entries(value)) {
          switch (op) {
            case '$eq':
              conditions.push(isNil(val) ? IsNull() : Equal(val));
              break;
            case '$gt':
              conditions.push(MoreThan(val));
              break;
            case '$gte':
              conditions.push(MoreThanOrEqual(val));
              break;
            case '$lt':
              conditions.push(LessThan(val));
              break;
            case '$lte':
              conditions.push(LessThanOrEqual(val));
              break;
            case '$ne':
              conditions.push(isNil(val) ? Not(IsNull()) : Not(val));
              break;
            case '$in':
              if (toArray(val).length) conditions.push(In(toArray(val)));
              break;
            case '$nin':
              if (toArray(val).length) conditions.push(Not(In(toArray(val))));
              break;
            case '$like':
              conditions.push(ILike(`%${val}%`));
              break;
            case '$begin':
              conditions.push(ILike(`${val}%`));
              break;
            case '$end':
              conditions.push(ILike(`%${val}`));
              break;
            case '$not':
              conditions.push(Not(this.parseCondition(val)));
              break;
            default:
              throw new MysqlException(`Operator ${op} not supported`, { op, val });
          }
        }

        if (conditions.length > 1) where[key] = And(...conditions);
        else where[key] = conditions[0];
        continue;
      }
      where[key] = value;
    }

    return where;
  }

  static parseOrder<T>(sort: any): FindManyOptions<T>['order'] {
    const order: FindManyOptions<T>['order'] = {};
    for (const [key, value] of Object.entries(sort)) {
      order[key] = value === 'asc' ? 'ASC' : 'DESC';
    }
    return order;
  }

  static parseRelations<T>(populate: IPopulate<T>): FindManyOptions<T>['relations'] {
    const relations: FindManyOptions<T>['relations'] = {};
    for (const [path, value] of Object.entries(populate)) {
      if (value === '*') {
        relations[path] = true;
        continue;
      }
      if (typeof value === 'object') {
        relations[path] = MysqlFinder.parseRelations(value['populate'] || {});
      }
    }
    return relations;
  }
}
