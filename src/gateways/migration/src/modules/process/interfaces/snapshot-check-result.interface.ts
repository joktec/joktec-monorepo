export interface SnapshotCheckResult {
  processId: number;
  mysqlTable: string;
  mysqlRecord: number;
  mongoRecord: number;
  isMark: boolean;
}
