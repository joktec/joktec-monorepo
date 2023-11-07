import { toArray } from '@joktec/core';
import { isDate, isNil, isObject, isRegExp } from 'lodash';
import { FindOptions, literal, Op } from 'sequelize';
import { IMysqlRequest } from '../models';
import { MysqlException } from '../mysql.exception';

export class MysqlHelper {
  static opMapping: Record<string, symbol> = {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $ne: Op.ne,
    $in: Op.in,
    $nin: Op.notIn,
    $all: Op.all,
    $not: Op.not,
    $like: Op.substring,
    $begin: Op.startsWith,
    $end: Op.endsWith,
  };

  static parseFilter(query: IMysqlRequest<any>): FindOptions {
    const { condition = {}, keyword } = query;
    const where: Record<string | symbol, any> = {};
    for (const [key, value] of Object.entries(condition)) {
      if (key === '$and') {
        where[Op.and] = toArray(value).map(c => this.parseFilter(c));
        continue;
      }

      if (key === '$or') {
        where[Op.or] = toArray(value).map(c => this.parseFilter(c));
        continue;
      }

      if (isNil(value)) {
        where[key][Op.is] = null;
        continue;
      }

      if (isDate(value) || isRegExp(value)) {
        where[key] = value;
        continue;
      }

      const keyOrSymbol: string | symbol = key.startsWith('$') ? this.opMapping[key] : key;
      if (!keyOrSymbol) throw new MysqlException(`Operator not support`, { key, condition });
      where[keyOrSymbol] = isObject(value) ? this.parseFilter(value) : value;
    }

    // Add keyword search
    if (keyword) {
      if (!where[Op.and]) where[Op.and] = [];
      where[Op.and].push(literal(`MATCH(name) AGAINST('${keyword}' IN BOOLEAN MODE)`));
    }

    return { where };
  }
}
