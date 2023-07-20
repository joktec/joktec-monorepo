import { BigQuery, Dataset, Table } from '@google-cloud/bigquery';
import { File, TableMetadata } from '@google-cloud/bigquery/build/src/table';
import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { BigQueryClient } from './bigquery.client';
import { BigQueryConfig } from './bigquery.config';
import { BigQueryUtils } from './bigquery.utils';
import { BigQueryRequest, BigQuerySchema, ISort, Row, SortOrder } from './models';

const RETRY_OPTS = 'bigquery.retry';

@Injectable()
export class BigQueryService extends AbstractClientService<BigQueryConfig, BigQuery> implements BigQueryClient {
  constructor() {
    super('bigquery', BigQueryConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: BigQueryConfig): Promise<BigQuery> {
    return new BigQuery({
      autoRetry: config.autoRetry,
      maxRetries: config.maxRetries,
      location: config.location,
      keyFilename: config.keyFilename,
      projectId: config.projectId,
    });
  }

  async start(client: BigQuery, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async stop(client: BigQuery, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  private getDataset(conId: string = DEFAULT_CON_ID): Dataset {
    const datasetId = this.getConfig(conId).datasetId;
    return this.getClient(conId).dataset(datasetId);
  }

  private getTable(tableId: string, conId: string = DEFAULT_CON_ID): Table {
    return this.getDataset(conId).table(tableId);
  }

  async isTableExist(tableId: string, conId: string = DEFAULT_CON_ID): Promise<boolean> {
    const [res] = await this.getTable(tableId, conId).exists();
    return res;
  }

  async createTable(tableId: string, schema: BigQuerySchema[], conId: string = DEFAULT_CON_ID): Promise<Table> {
    const isTableExist = await this.isTableExist(tableId, conId);
    if (isTableExist) {
      return this.getTable(tableId, conId);
    }

    const options: TableMetadata = { schema, location: this.getConfig(conId).location };
    const [table] = await this.getDataset(conId).createTable(tableId, options);
    return table;
  }

  async deleteTable(tableId: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    await this.getTable(tableId, conId).delete({ ignoreNotFound: true });
  }

  /**
   * Read More
   * https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-json#limitations
   * @param tableId
   * @param source
   * @param conId
   */
  async load(tableId: string, source: string | File, conId: string = DEFAULT_CON_ID): Promise<any> {
    const table: Table = this.getTable(tableId, conId);
    const [res] = await table.load(source);
    return res;
  }

  async insert(
    tableId: string,
    rows: Row[],
    schema: BigQuerySchema[],
    options?: { raw: boolean },
    conId: string = DEFAULT_CON_ID,
  ): Promise<any> {
    if (!rows.length) return [];
    if (!options?.raw) {
      const table: Table = this.getTable(tableId, conId);
      const [res] = await table.insert(rows, { raw: false, schema });
      return res;
    }

    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const [query, params] = await Promise.all([
      BigQueryUtils.buildInsertStatementQuery(fullTableName, rows, schema),
      BigQueryUtils.buildInsertParam(rows, schema),
    ]);
    const [res] = await this.getClient(conId).query({ query, params });
    return res;
  }

  /**
   * Read more:
   * https://stackoverflow.com/questions/48177241/google-bq-how-to-upsert-existing-data-in-tables
   * https://cloud.google.com/bigquery/docs/updating-data
   */
  async merge(tableId: string, tableChangedId: string, schema: BigQuerySchema[], conId: string = DEFAULT_CON_ID) {
    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const fullTableChangedName = this.getConfig(conId).getTableName(tableChangedId);

    const updateSetKeys = [];
    const insertKeys = ['id'];
    schema.map(column => {
      const name = column.name;
      if (name !== 'id') {
        updateSetKeys.push(`${name} = S.${name}`);
        insertKeys.push(name);
      }
    });

    const query: string = [
      `MERGE ${fullTableName} AS T`,
      `USING ${fullTableChangedName} AS S`,
      `ON T.id = S.id`,
      `WHEN MATCHED THEN`,
      `UPDATE SET ${updateSetKeys.join(', ')}`,
      `WHEN NOT MATCHED THEN`,
      `INSERT (${insertKeys.join(', ')})`,
      `VALUES(${insertKeys.join(', ')})`,
    ].join(' ');

    this.logService.debug('Merge query %s', query);
    const [res] = await this.getClient(conId).query({ query });
    return res;
  }

  async truncate(tableId: string, conId: string = DEFAULT_CON_ID) {
    const isTableExist = await this.isTableExist(tableId);
    if (!isTableExist) {
      return [];
    }

    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const query = `TRUNCATE TABLE ${fullTableName}`;
    const [res] = await this.getClient(conId).query(query);
    return res;
  }

  async deleteRow(tableId: string, condition: { [key: string]: any }, conId: string = DEFAULT_CON_ID) {
    const isTableExist = await this.isTableExist(tableId);
    if (!isTableExist) {
      return [];
    }

    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const whereCondition = Object.keys(condition)
      .map(key => `${key} = @${key}`)
      .join(' AND ');

    const query = `DELETE FROM ${fullTableName} WHERE ${whereCondition}`;
    const [res] = await this.getClient(conId).query({ query: query, params: { ...condition } });
    return res;
  }

  async isHaveDuplicate(tableId: string, conId: string = DEFAULT_CON_ID): Promise<boolean> {
    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const query: string[] = [
      'SELECT',
      `(SELECT COUNT(1) FROM (SELECT DISTINCT id FROM ${fullTableName})) AS distinct_rows,`,
      `(SELECT COUNT(1) FROM ${fullTableName}) AS total_rows`,
    ];

    this.logService.debug('Check duplicate record in table query %j', query);
    const [res] = await this.getClient(conId).query(query.join(' '));
    if (res.length) {
      return res[0].distinct_rows < res[0].total_rows;
    }
    return false;
  }

  async deDuplicated(
    tableId: string,
    sort: ISort = { id: SortOrder.ASC },
    conId: string = DEFAULT_CON_ID,
  ): Promise<any> {
    const isTableHaveDup = await this.isHaveDuplicate(tableId, conId);
    if (!isTableHaveDup) return [];

    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const orderBy = Object.keys(sort).map(key => `${key} ${sort[key]}`);
    const query = `
        CREATE OR REPLACE TABLE ${fullTableName} AS (
          SELECT * EXCEPT(row_num)
          FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY id ORDER BY ${orderBy} ) row_num FROM ${fullTableName}) AS t
          WHERE row_num=1
        );`;

    this.logService.debug('De-duplicate record in table query %s', query);
    const [res] = await this.getClient(conId).query(query);
    return res;
  }

  async query<T>(tableId: string, req: BigQueryRequest, conId: string = DEFAULT_CON_ID): Promise<T[]> {
    const query: string[] = [];

    if (req.fields.length) {
      query.push(`SELECT ${req.fields.join(', ')}`);
    } else {
      query.push(`SELECT *`);
    }

    const fullTableName = this.getConfig(conId).getTableName(tableId);
    query.push(`FROM ${fullTableName}`);

    if (req.where) {
      const where = req.where.join(' AND ');
      query.push(`WHERE ${where}`);
    }

    if (req.sort) {
      const orderBy = Object.keys(req.sort)
        .map(field => `${field} ${req.sort[field]}`)
        .join(', ');
      query.push(`ORDER BY ${orderBy}`);
    }

    if (req.limit) query.push(`LIMIT ${req.limit}`);
    if (req.offset) query.push(`OFFSET ${req.offset}`);

    this.logService.debug('Query builder %j', query);
    const [res] = await this.getClient(conId).query(query.join(' '));
    return res;
  }

  async rawQuery<T>(query: string, tableId: string, conId: string = DEFAULT_CON_ID): Promise<T[]> {
    const fullTableName = this.getConfig(conId).getTableName(tableId);
    const fullQuery = query.replace('{{table}}', fullTableName);
    this.logService.debug('Query builder %s', fullQuery);
    const [res] = await this.getClient(conId).query(fullQuery);
    return res as T[];
  }
}
