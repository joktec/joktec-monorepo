import { ICondition, IDataType, IOperation } from '@joktec/core';
import { FindOptions, literal, Op } from 'sequelize';
import { Model } from 'sequelize-typescript';

export const preHandleQuery = <T extends Model<T>>(condition: ICondition<T>, keyword?: string): FindOptions => {
  const where: Record<string | symbol, any> = {};

  for (const [key, value] of Object.entries(condition)) {
    if (key === '$and') {
      where[Op.and] = (value as ICondition<T>[]).map(c => preHandleQuery(c));
    } else if (key === '$or') {
      where[Op.or] = (value as ICondition<T>[]).map(c => preHandleQuery(c));
    } else if (typeof value === 'object') {
      const entries = Object.entries(value) as [IOperation, IDataType][];
      for (const [op, val] of entries) {
        const sqlOp = convertOp(op);
        where[key] = { ...where[key], [sqlOp]: val };
      }
    } else {
      where[key] = value;
    }
  }

  // Add keyword search
  if (keyword) {
    if (!where[Op.and]) where[Op.and] = [];
    where[Op.and].push(literal(`MATCH(name) AGAINST('${keyword}' IN BOOLEAN MODE)`));
  }

  return { where };
};

export const convertOp = (op: IOperation): symbol => {
  const mapping: Record<IOperation, symbol> = {
    $ne: Op.ne,
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $in: Op.in,
    $nin: Op.notIn,
    $eq: Op.eq,
  };
  return mapping[op] || Op.eq;
};
