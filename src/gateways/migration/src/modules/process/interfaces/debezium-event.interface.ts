import { Status } from '../enums/status.enum';

export interface DebeziumEvent {
  schema;
  payload: DebeziumPayload;
}

export interface DebeziumPayload {
  before;
  after;
  source: DebeziumPayloadSource;
}

export interface DebeziumPayloadSource {
  db: string;
  table: string;
  snapshot: boolean;
  ts_ms: number;
}

export interface SyncStatus {
  status: Status;
  lagMs: number;
}
