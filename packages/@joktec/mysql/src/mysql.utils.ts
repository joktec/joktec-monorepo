import { ICondition, IDataType, IKeyword, IOperation } from '@joktec/core';
import { FindOptions, Op } from 'sequelize';

export const preHandleQuery = (condition: ICondition | string | number, keyword?: IKeyword): FindOptions => {
  const where: Record<string | symbol, any> = {};

  for (const [key, value] of Object.entries(condition)) {
    if (key === '$and') {
      where[Op.and] = (value as ICondition[]).map(c => preHandleQuery(c));
    } else if (key === '$or') {
      where[Op.or] = (value as ICondition[]).map(c => preHandleQuery(c));
    } else if (typeof value === 'object') {
      const entries = Object.entries(value) as [IOperation, IDataType][];
      for (const [op, val] of entries) {
        where[key] = {
          ...where[key],
          [Op[op]]: val,
        };
      }
    } else {
      where[key] = value;
    }
  }

  // Add keyword search
  if (keyword) {
    Object.entries(keyword).map(([key, value]) => {
      where[key] = { [Op.substring]: value };
    });
  }

  return { where };
};
