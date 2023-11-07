import { DestinationStream } from 'pino';
import { toArray } from '../utils';
import { CloudWatchConfig } from './cloudwatch/cloudwatch.config';
import { FluentdConfig } from './fluentd/fluentd.config';
import { GoogleLogConfig } from './googleLog/googleLog.config';
import { LogLevel } from './log.level';
import { LogStashConfig } from './logstash/logstash.config';
import { LokiConfig } from './loki/loki.config';
import { PinoMongoConfig } from './mongodb/pino-mongo.config';

export class LogConfig {
  level!: LogLevel;
  format!: 'pretty' | 'json';
  contexts?: string | string[];
  customStreams?: DestinationStream[];
  fluentd?: FluentdConfig;
  logStash?: LogStashConfig;
  cloudWatch?: CloudWatchConfig;
  googleLog?: GoogleLogConfig;
  loki?: LokiConfig;
  mongo?: PinoMongoConfig;

  constructor(props: LogConfig) {
    this.level = props?.level ?? 'info';
    this.format = props?.format || 'pretty';
    this.contexts = this.setSearchValue(props?.contexts);
    this.customStreams = toArray<DestinationStream>(props?.customStreams);
    this.logStash = props?.logStash ? new LogStashConfig(props?.logStash) : null;
    this.fluentd = props?.fluentd ? new FluentdConfig(props?.fluentd) : null;
    this.cloudWatch = props?.cloudWatch ? new CloudWatchConfig(props?.cloudWatch) : null;
    this.googleLog = props?.googleLog ? new GoogleLogConfig(props?.googleLog) : null;
    this.loki = props?.loki ? new LokiConfig(props?.loki) : null;
    this.mongo = props?.mongo ? new PinoMongoConfig(props?.mongo) : null;
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }
}
