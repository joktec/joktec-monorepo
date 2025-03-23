import { toArray } from '@joktec/utils';
import { SelectQueryBuilder } from 'typeorm';

export function printSql(query: string, parameters: any[] = []): string {
  let sql: string = query;
  toArray(parameters).forEach((param: any) => {
    sql = sql.replace('?', () => {
      if (typeof param === 'string') return `'${param}'`;
      else if (param instanceof Date) return `'${param.toISOString()}'`;
      else if (param === null || param === undefined) return 'NULL';
      else return param.toString();
    });
  });
  return sql;
}

export function exportSql(builder: SelectQueryBuilder<any>) {
  const [query, params] = builder.getQueryAndParameters();
  return printSql(query, params);
}
