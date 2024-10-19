import { IBaseRequest, ICondition, IPopulate, toArray, toBool } from '@joktec/core';
import { isNil } from 'lodash';
import {
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
import { MysqlModel } from '../models';
import { MysqlException } from '../mysql.exception';

export class MysqlFinder {
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
        for (const [op, val] of Object.entries(value)) {
          switch (op) {
            case '$eq':
              where[key] = isNil(value) ? IsNull() : Equal(val);
              break;
            case '$gt':
              where[key] = MoreThan(val);
              break;
            case '$gte':
              where[key] = MoreThanOrEqual(val);
              break;
            case '$lt':
              where[key] = LessThan(val);
              break;
            case '$lte':
              where[key] = LessThanOrEqual(val);
              break;
            case '$ne':
              where[key] = isNil(val) ? Not(IsNull()) : Not(val);
              break;
            case '$in':
              if (toArray(val).length) where[key] = In(toArray(val));
              break;
            case '$nin':
              if (toArray(val).length) where[key] = Not(In(toArray(val)));
              break;
            case '$like':
              where[key] = ILike(`%${val}%`);
              break;
            case '$begin':
              where[key] = ILike(`${val}%`);
              break;
            case '$end':
              where[key] = ILike(`%${val}`);
              break;
            case '$not':
              where[key] = Not(this.parseCondition(val));
              break;
            default:
              throw new MysqlException(`Operator ${op} not supported`, { op, val });
          }
        }
      } else {
        where[key] = value;
      }
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
