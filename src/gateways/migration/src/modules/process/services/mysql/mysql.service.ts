import { Injectable, Logger } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2';
import { ColumnType } from '../../enums/table-enum';

import {
  ColumnMapping,
  DescribeTable,
  FieldKeyType,
  ColumnMappingCache,
} from '../../interfaces/table-mapping.interface';
import { UtilService } from '../util/util.service';

@Injectable()
export class MysqlService {
  private logger = new Logger(MysqlService.name);

  private connection: Connection;

  private tableColumnsMap: Map<string, ColumnMappingCache> = new Map();

  private TYPE_MAPPING = {
    nvarchar: ColumnType.STRING,
    bigint: ColumnType.STRING,
    text: ColumnType.STRING,
    tinyblob: ColumnType.STRING,
    mediumtext: ColumnType.STRING,
    mediumblob: ColumnType.STRING,
    longblob: ColumnType.STRING,
    varchar: ColumnType.STRING,
    longtext: ColumnType.STRING,
    binary: ColumnType.STRING,
    varbinary: ColumnType.STRING,
    char: ColumnType.STRING,
    blob: ColumnType.STRING,
    int: ColumnType.NUMBER,
    mediumint: ColumnType.NUMBER,
    decimal: ColumnType.NUMBER,
    year: ColumnType.NUMBER,
    tinyint: ColumnType.NUMBER,
    double: ColumnType.NUMBER,
    float: ColumnType.NUMBER,
    bit: ColumnType.BUFFER_NUMBER,
    enum: ColumnType.Enum,
    timestamp: ColumnType.DATE,
    datetime: ColumnType.DATE,
    time: ColumnType.DATE,
    date: ColumnType.DATE,
    json: ColumnType.ARRAY,
    set: ColumnType.ARRAY,
  };

  constructor(private utilService: UtilService) {
    const MYSQL_URL_INFO = {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    };
    this.connection = createConnection(MYSQL_URL_INFO);
  }

  getConnection() {
    return this.connection;
  }

  async findById(tableName: string, feildId: string, idValue: string) {
    this.connection.connect();

    let data;
    const query = `SELECT * FROM \`${tableName}\` WHERE \`${feildId}\` = ?`;
    await this.getDataFromMySQLWithValues(this.connection, query, [
      idValue,
    ]).then((results) => {
      const mysqlData = JSON.parse(JSON.stringify(results));

      if (mysqlData.length > 0) {
        data = mysqlData[0];
      }
    });

    return data;
  }

  async insert(tableName: string, fieldId: string, data) {
    this.logger.log('Insert data to MySQL.');
    this.connection.connect();

    const query: string = await this.buildInsertQuery(tableName);
    const values: Array<any> = [
      await this.buildInsertValues(tableName, fieldId, data),
    ];

    await this.getDataFromMySQLWithValues(this.connection, query, [values]);
  }

  async buildInsertQuery(tableName: string): Promise<string> {
    const columns: Array<ColumnMapping> = await this.getOrCreateTableColumn(
      tableName,
    );

    let sql = `INSERT INTO \`${tableName}\` (\`${columns[0].name}\`, `;

    for (let i = 1; i < columns.length - 1; i++) {
      sql += '`' + columns[i].name + '`, ';
    }

    sql += `\`${columns[columns.length - 1].name}\`) VALUES ?`;

    return sql;
  }

  async buildInsertValues(
    tableName: string,
    fieldId: string,
    data,
  ): Promise<Array<any>> {
    const columns: Array<ColumnMapping> = await this.getOrCreateTableColumn(
      tableName,
    );

    const values = [];
    for (let i = 0; i < columns.length; i++) {
      const name = columns[i].name;
      const value = data[name];
      if (value === undefined || value === null) {
        values.push(null);
      } else {
        values.push(data[name]);
      }
    }

    return values;
  }

  async update(tableName: string, fieldId: string, data) {
    this.connection.connect();
    const query: string = await this.buildUpdateQuery(tableName, fieldId);
    const values = await this.buildUpdateValues(tableName, fieldId, data);

    await this.getDataFromMySQLWithValues(this.connection, query, values);
  }

  async buildUpdateQuery(tableName: string, fieldId: string) {
    const columns: Array<ColumnMapping> = await this.getOrCreateTableColumn(
      tableName,
    );

    let sql = `UPDATE \`${tableName}\` SET `;

    let isFirst = true;
    for (let i = 0; i < columns.length; i++) {
      const columnName = columns[i].name;
      if (columnName != fieldId) {
        if (isFirst) {
          sql += `\`${columnName}\` = ?`;
          isFirst = false;
        } else {
          sql += ` , \`${columnName}\` = ?`;
        }
      }
    }

    sql += ` WHERE \`${fieldId}\` = ? `;

    return sql;
  }

  async buildUpdateValues(
    tableName: string,
    fieldId: string,
    data,
  ): Promise<Array<any>> {
    const columns: Array<ColumnMapping> = await this.getOrCreateTableColumn(
      tableName,
    );

    const values = [];
    for (let i = 0; i < columns.length; i++) {
      const name = columns[i].name;
      if (fieldId != name) {
        const value = data[name];
        if (value === undefined || value === null) {
          values.push(null);
        } else {
          values.push(data[name]);
        }
      }
    }

    values.push(data[fieldId]);

    return values;
  }

  async delete(tableName: string, fieldId: string, idValue: string) {
    const query = `DELETE FROM \`${tableName}\` WHERE \`${fieldId}\` = '${idValue}'`;

    await this.getDataFromMySQL(this.connection, query);
  }

  async getOrCreateTableColumn(
    tableName: string,
  ): Promise<Array<ColumnMapping>> {
    let columnsMappingCache: ColumnMappingCache =
      this.tableColumnsMap.get(tableName);

    if (
      // columnsMappingCache exist and caching time > 1 minute
      (columnsMappingCache &&
        new Date().getTime() - columnsMappingCache.time_ts > 60 * 1000) ||
      !columnsMappingCache
    ) {
      const tableColumns = new Array<ColumnMapping>();

      await this.getDataFromMySQL(
        this.connection,
        `DESCRIBE \`${tableName}\``,
      ).then((results) => {
        const mysqlData = JSON.parse(JSON.stringify(results));
        mysqlData.forEach((result: DescribeTable) => {
          const columnMapping: ColumnMapping = {
            name: result.Field,
            type: this.TYPE_MAPPING[
              result.Type.replace(/\(.*/g, '').toLowerCase()
            ],
            isPrimary: !!(result.Key === FieldKeyType.PrimaryKey),
            isForeign: !!(result.Key === FieldKeyType.ForeignKey),
          };
          tableColumns.push(columnMapping);
        });
      });
      columnsMappingCache = {
        columnMappings: tableColumns,
        time_ts: new Date().getTime(),
      };
      this.tableColumnsMap.set(tableName, columnsMappingCache);
    }

    return columnsMappingCache.columnMappings;
  }

  async getDataFromMySQL(connection: Connection, query: string) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  async getDataFromMySQLWithValues(
    connection: Connection,
    query: string,
    values: Array<any>,
  ) {
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}
