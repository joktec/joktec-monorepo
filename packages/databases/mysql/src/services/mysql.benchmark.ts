import { LogService } from '@joktec/core';
import { Logger } from 'typeorm';
import { printSql } from '../helpers';
import { MysqlBenchmarkConfig, MysqlLogLevel } from '../mysql.config';
import { MysqlException } from '../mysql.exception';

export class MysqlBenchmark implements Logger {
  constructor(
    private benchmark: MysqlBenchmarkConfig,
    private logService: LogService,
  ) {
    this.logService.setContext(MysqlBenchmark.name);
  }

  logQuery(query: string, parameters?: any[]) {
    if (this.benchmark.enable && (this.benchmark.all || this.benchmark.level?.includes(MysqlLogLevel.query))) {
      const sql = printSql(query, parameters);
      this.logService.info('[SQL]: %s', sql);
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    if (this.benchmark.enable && (this.benchmark.all || this.benchmark.level?.includes(MysqlLogLevel.error))) {
      const _error = error instanceof Error ? error : new MysqlException(error);
      const sql = printSql(query, parameters);
      this.logService.error(_error, `[FAILED QUERY]: %s`, sql);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    const sql = printSql(query, parameters);
    this.logService.warn('[SLOW QUERY: %s ms]: %s', time, sql);
  }

  logSchemaBuild(message: string) {
    if (this.benchmark.all && this.benchmark.level?.includes(MysqlLogLevel.schema)) {
      this.logService.trace(message);
    }
  }

  logMigration(message: string) {
    this.logService.trace(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        if (this.benchmark.all && this.benchmark.level?.includes(MysqlLogLevel.log))
          this.logService.debug('[LOG]: %s', message);
        break;
      case 'info':
        if (this.benchmark.all && this.benchmark.level?.includes(MysqlLogLevel.info))
          this.logService.info('[INFO]: %s', message);
        break;
      case 'warn':
        if (this.benchmark.all && this.benchmark.level?.includes(MysqlLogLevel.warn))
          this.logService.warn('[WARN]: %s', message);
        break;
    }
  }
}
