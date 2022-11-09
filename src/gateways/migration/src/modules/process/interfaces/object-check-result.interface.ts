export interface ObjectCheckResult {
  tableName: string;
  mysqlCount?: number;
  mongoCount?: number;
  same?: boolean;
  keyDiffs?: Array<string>;
  idDiffs?: Array<string>;
  notCompare?: boolean;
  reason?: string;
}
