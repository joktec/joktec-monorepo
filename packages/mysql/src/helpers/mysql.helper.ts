import { ICondition, IPopulate, ISort } from '@joktec/core';
import { SelectQueryBuilder } from 'typeorm';

export class MysqlHelper {
  static applyCondition<T>(qb: SelectQueryBuilder<T>, condition?: ICondition<T>) {
    if (!condition) return;

    for (const [key, value] of Object.entries(condition)) {
      if (key === '$or') {
        const orConditions = value.map((c: ICondition<T>) => MysqlHelper.buildCondition(qb, c));
        qb.orWhere(orConditions.join(' OR '));
      } else if (key === '$and') {
        const andConditions = value.map((c: ICondition<T>) => MysqlHelper.buildCondition(qb, c));
        qb.andWhere(andConditions.join(' AND '));
      } else {
        const whereClause = MysqlHelper.buildCondition(qb, { [key]: value } as ICondition<T>);
        qb.andWhere(whereClause);
      }
    }
  }

  static buildCondition<T>(qb: SelectQueryBuilder<T>, condition: ICondition<T>) {
    for (const [key, value] of Object.entries(condition)) {
      if (typeof value === 'object') {
        for (const [op, val] of Object.entries(value)) {
          switch (op) {
            // Toán tử so sánh
            case '$eq':
              qb.andWhere(`${qb.alias}.${key} = :${key}`, { [key]: val });
              break;
            case '$gt':
              qb.andWhere(`${qb.alias}.${key} > :${key}`, { [key]: val });
              break;
            case '$gte':
              qb.andWhere(`${qb.alias}.${key} >= :${key}`, { [key]: val });
              break;
            case '$lt':
              qb.andWhere(`${qb.alias}.${key} < :${key}`, { [key]: val });
              break;
            case '$lte':
              qb.andWhere(`${qb.alias}.${key} <= :${key}`, { [key]: val });
              break;
            case '$ne':
              qb.andWhere(`${qb.alias}.${key} != :${key}`, { [key]: val });
              break;

            // Toán tử array
            case '$in':
              qb.andWhere(`${qb.alias}.${key} IN (:...${key})`, { [key]: val });
              break;
            case '$nin':
              qb.andWhere(`${qb.alias}.${key} NOT IN (:...${key})`, { [key]: val });
              break;
            case '$all':
              // Đây là cách giả lập toán tử `$all`, TypeORM không có toán tử này nhưng có thể xử lý theo cách thủ công
              qb.andWhere(
                `${qb.alias}.${key} @> ARRAY[:...${key}]`, // PostgreSQL array contains operator
                { [key]: val },
              );
              break;

            // Toán tử văn bản (Text)
            case '$like':
              qb.andWhere(`${qb.alias}.${key} LIKE :${key}`, { [key]: `%${val}%` });
              break;
            case '$begin':
              qb.andWhere(`${qb.alias}.${key} LIKE :${key}`, { [key]: `${val}%` });
              break;
            case '$end':
              qb.andWhere(`${qb.alias}.${key} LIKE :${key}`, { [key]: `%${val}` });
              break;

            // Toán tử boolean
            case '$exists':
              qb.andWhere(`${qb.alias}.${key} IS NOT NULL`);
              break;
            case '$nil':
              qb.andWhere(`${qb.alias}.${key} IS NULL`);
              break;
            case '$empty':
              qb.andWhere(`${qb.alias}.${key} = ''`);
              break;

            // Toán tử NOT
            case '$not':
              qb.andWhere(`${qb.alias}.${key} != :${key}`, { [key]: val });
              break;

            // Toán tử size cho array
            case '$size':
              qb.andWhere(`array_length(${key}, 1) = :${key}`, { [key]: val });
              break;

            default:
              throw new Error(`Unsupported operator: ${op}`);
          }
        }
      } else {
        qb.andWhere(`${qb.alias}.${key} = :${key}`, { [key]: value });
      }
    }
    return qb;
  }

  static applyProjection<T>(qb: SelectQueryBuilder<T>, select?: string | string[]) {
    if (!select) return;
    const fields = Array.isArray(select) ? select : select.split(',');
    qb.select(fields.map(field => `${qb.alias}.${field.trim()}`));
  }

  static applyOrder<T>(qb: SelectQueryBuilder<T>, sort?: ISort<T>) {
    if (!sort) return;
    for (const [key, value] of Object.entries(sort)) {
      qb.addOrderBy(`${qb.alias}.${key}`, value === 'asc' ? 'ASC' : 'DESC');
    }
  }

  static applyRelations<T>(qb: SelectQueryBuilder<T>, populate?: IPopulate<T>) {
    if (!populate) return;
    for (const [relation, value] of Object.entries(populate)) {
      if (value === '*') {
        qb.leftJoinAndSelect(`${qb.alias}.${relation}`, relation);
      } else if (typeof value === 'object') {
        qb.leftJoinAndSelect(`${qb.alias}.${relation}`, relation);
      }
    }
  }
}
