import { ColumnType } from '../enums/table-enum';

export enum FieldKeyType {
  ForeignKey = 'MUL',
  PrimaryKey = 'PRI',
  UniqueKey = 'UNI',
}
export class TableMapping {
  mysqlTable: string;
  mysqlId: string;
  mongoDatabase: string;
  mongoCollection: string;
  updatedDateField: string;

  constructor(
    mysqlTable: string,
    mysqlId: string,
    mongoDatabase: string,
    mongoCollection: string,
    updatedDateField: string,
  ) {
    this.mysqlTable = mysqlTable;
    this.mysqlId = mysqlId;
    this.mongoDatabase = mongoDatabase;
    this.mongoCollection = mongoCollection;
    this.updatedDateField = updatedDateField;
  }
}

export interface DescribeTable {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string;
  Extra: string;
}

export interface ColumnMappingCache {
  columnMappings: Array<ColumnMapping>;
  time_ts: number;
}

export interface ColumnMapping {
  name: string;
  type: ColumnType;
  isPrimary?: boolean;
  isForeign?: boolean;
}
