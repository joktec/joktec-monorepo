import { Knex } from 'knex';
import { SearchKeyword, SortFiled, Where, WhereField } from './models';
import { SchemaInspector } from 'knex-schema-inspector/lib/types/schema-inspector';
import { chain, has, snakeCase, isEmpty } from 'lodash';
import { isNil, toInt } from '@baotg/core';

const dateKeys = ['deleted_at', 'delete_at'];
const boolKeys = ['is_deleted', 'is_delete', 'deleted'];

export const buildSorter = (qb: Knex.QueryBuilder, sortField: SortFiled) => {
  chain(sortField || {})
    .keys()
    .filter(key => !isNil(key) && !isEmpty(key))
    .map(key => qb.orderBy(snakeCase(key), sortField[key] || 'asc'))
    .value();
};

export const buildKeyword = (qb: Knex.QueryBuilder, searchKeyword: SearchKeyword) => {
  const { columns, value } = searchKeyword || {};
  if (isEmpty(searchKeyword.columns) || !searchKeyword.value) return;

  const keys: string[] = columns.map(snakeCase);
  const firstKey = keys.shift();
  qb.where(builder => {
    builder.where(snakeCase(firstKey), 'like', `%${value}%`);
    keys.map(key => builder.orWhere(snakeCase(key), 'like', `%${value}%`));
  });
};

export const buildQuery = (qb: Knex.QueryBuilder, where: Where): void => {
  where.map((clause: WhereField) => {
    const [column, operation, value, not] = clause;
    if (not) {
      qb.whereNot(snakeCase(column), operation, value);
    } else {
      qb.where(snakeCase(column), operation, value);
    }
  });
};

export const excludeDeleted = async (qb: Knex.QueryBuilder, tableName: string, inspector: SchemaInspector) => {
  for (const key of dateKeys) {
    if (!(await inspector.hasColumn(tableName, key))) {
      continue;
    }

    const column = await inspector.columnInfo(tableName, key);
    if (['datetime', 'date', 'timestamp', 'time'].includes(column?.data_type)) {
      qb.whereNull(key);
      return;
    }
  }

  for (const key of boolKeys) {
    if (!(await inspector.hasColumn(tableName, key))) {
      continue;
    }

    const column = await inspector.columnInfo(tableName, key);
    if (['int', 'tinyint'].includes(column?.data_type)) {
      qb.whereNot(key, 1);
      return;
    }
  }
};

export const isDeleted = (entity: any): boolean => {
  if (!entity) return true;

  for (const key of dateKeys) {
    if (has(entity, key) && !isNil(entity[key])) return true;
  }

  for (const key of boolKeys) {
    if (has(entity, key) && toInt(entity[key], 0) === 1) return true;
  }

  return false;
};
