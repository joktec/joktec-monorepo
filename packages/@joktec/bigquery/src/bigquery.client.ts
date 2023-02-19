import { Client } from '@joktec/core';
import { BigQueryConfig } from './bigquery.config';
import { BigQuery, Table } from '@google-cloud/bigquery';
import { BigQueryRequest, BigQuerySchema, ISort, Row } from './models';
import { File } from '@google-cloud/bigquery/build/src/table';

export interface BigQueryClient extends Client<BigQueryConfig, BigQuery> {
  isTableExist(tableId: string, conId?: string): Promise<boolean>;

  createTable(tableId: string, schema: BigQuerySchema[], conId?: string): Promise<Table>;

  deleteTable(tableId: string, conId?: string): Promise<void>;

  load(tableId: string, source: string | File, conId?: string): Promise<any>;

  insert(
    tableId: string,
    rows: Row[],
    schema: BigQuerySchema[],
    options?: { raw: boolean },
    conId?: string,
  ): Promise<any>;

  merge(tableId: string, tableChangedId: string, schema: BigQuerySchema[], conId?: string): Promise<any>;

  truncate(tableId: string, conId?: string): Promise<any>;

  deleteRow(tableId: string, condition: { [key: string]: any }, conId?: string): Promise<any>;

  isHaveDuplicate(tableId: string, conId?: string): Promise<boolean>;

  deDuplicated(tableId: string, sort: ISort, conId?: string): Promise<any>;

  query<T>(tableId: string, req: BigQueryRequest, conId?: string): Promise<T[]>;

  rawQuery<T>(query: string, tableId: string, conId?: string): Promise<T[]>;
}
