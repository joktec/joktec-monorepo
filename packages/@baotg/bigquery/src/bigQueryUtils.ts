import { BigQuerySchema, Row } from './models';
import _ from 'lodash';

export class BigQueryUtils {
  /**
   * Output: INSERT INTO `MyTable` (Column1, Column2, Column3) VALUES (?, ?, ?), (?, ?, ?);
   * @param tableName
   * @param rows
   * @param schema
   */
  static async buildInsertStatementQuery(tableName: string, rows: Row[], schema: BigQuerySchema[]): Promise<string> {
    const insertKey = _.map(schema, 'name').join(', ');
    const rowBinding: string = _.times(schema.length)
      .map(_ => `?`)
      .join(', ');
    const insertBinding: string = _.times(rows.length)
      .map(_ => '(' + rowBinding + ')')
      .join(', ');
    return `INSERT INTO \`${tableName}\` (${insertKey}) VALUES ${insertBinding};`;
  }

  /**
   * Input: [{id: 1, title: 'ABC'}, {id: 2, title: 'XYZ'}]
   * Output: [1, 'ABC', 2, 'XYZ']
   * @param rows
   * @param schema
   */
  static async buildInsertParam(rows: Row[], schema: BigQuerySchema[]): Promise<any[]> {
    const keys: string[] = _.map(schema, 'name');
    return _.chain(rows)
      .map(row => keys.map(key => row[key]))
      .flatten()
      .value();
  }
}
