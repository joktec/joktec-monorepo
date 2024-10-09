import { IBaseRequest, ICondition, IPopulate, toArray, toBool } from '@joktec/core';
import {
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { MysqlModel } from '../models';
import { MysqlException } from '../mysql.exception';

export class MysqlHelper {
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

  static parseFilter<T>(query: IBaseRequest<T>): FindManyOptions<T> {
    const { condition = {}, keyword } = query;
    const where: FindOptionsWhere<T> = MysqlHelper.parseCondition(condition);
    if (keyword && typeof where === 'object') {
      where['name'] = ILike(`%${keyword}%`);
    }
    return { where };
  }

  static parseCondition<T>(condition: ICondition<T>): FindOptionsWhere<T> {
    const where: FindOptionsWhere<T> = {};

    for (const [key, value] of Object.entries(condition)) {
      if (key === '$and' || key === '$or') {
        where[key === '$and' ? 'AND' : 'OR'] = value.map((c: ICondition<T>) => MysqlHelper.parseCondition(c));
        continue;
      }

      if (value === null || value === undefined) {
        where[key] = Not(null);
        continue;
      }

      if (typeof value === 'object') {
        for (const [op, val] of Object.entries(value)) {
          switch (op) {
            case '$eq':
              where[key] = val;
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
              where[key] = Not(val);
              break;
            case '$in':
              where[key] = In(toArray(val));
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
    const relations: Record<string, any> = {};
    for (const [key, value] of Object.entries(populate)) {
      if (value === '*') {
        relations[key] = true;
        continue;
      }

      if (typeof value === 'object') {
        relations[key] = MysqlHelper.parseRelations(value['populate'] || {});
      }
    }
    return relations;
  }
}
