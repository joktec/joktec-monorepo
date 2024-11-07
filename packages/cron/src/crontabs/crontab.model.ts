import { CrontabHistoryStatus, CrontabHistoryType, CrontabStatus, CrontabType } from './crontab.constant';

export interface ICrontabModel {
  id: string;
  code: string;
  title?: string;
  description?: string;
  serviceName: string;
  methodName: string;
  type: CrontabType;
  expression?: string;
  cronDate?: Date;
  timeout?: number;
  timezone?: string;
  parameters?: Record<string, any>;
  lastExecution?: Date;
  nextExecution?: Date;
  status: CrontabStatus;
  snapshot?: () => string;
}

export interface ICrontabHistoryModel {
  id: string;
  cronId: string;
  type: CrontabHistoryType;
  snapshot?: Record<string, any>;
  executedAt: Date;
  finishedAt?: Date;
  duration?: string;
  status: CrontabHistoryStatus;
  res?: Record<string, any>;
  error?: Record<string, any>;
}
