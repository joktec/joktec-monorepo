import { Clazz } from '@joktec/core';
import { CrontabHistoryStatus, CrontabHistoryType, CrontabStatus, CrontabType, CronTrace } from './crontab.constant';

export interface ICrontabMeta {
  cron: Partial<ICrontabModel>;
  service: Clazz;
  verbose?: boolean;
  trace?: CronTrace;
}

export interface ICrontabOption {
  title?: string;
  timezone?: string;
  timeout?: number;
  parameters?: { [key: string]: any };
  verbose?: boolean;
  trace?: CronTrace;
}

export interface ICrontabModel {
  id: string;
  code: string;
  title?: string;
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
  snapshot?: () => Record<string, any>;
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
