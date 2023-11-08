import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { DestinationStream } from 'pino';
import { IsTypes } from '../validation';
import { CloudWatchConfig } from './cloudwatch/cloudwatch.config';
import { FluentdConfig } from './fluentd/fluentd.config';
import { LogLevel, LogFormat } from './log.enum';
import { LogStashConfig } from './logstash/logstash.config';
import { LokiConfig } from './loki/loki.config';
import { PinoMongoConfig } from './mongodb/pino-mongo.config';

export class LogConfig {
  @IsNotEmpty()
  @IsEnum(LogLevel)
  level?: LogLevel = 'info';

  @IsOptional()
  @IsEnum(LogFormat)
  format?: LogFormat = LogFormat.PRETTY;

  @IsOptional()
  contexts?: string | string[];

  @IsOptional()
  @IsBoolean()
  useFilter?: boolean = false;

  @IsOptional()
  customStreams?: DestinationStream[] = [];

  @IsOptional()
  @IsTypes([FluentdConfig])
  fluentd?: FluentdConfig;

  @IsOptional()
  @IsTypes([LogStashConfig])
  logStash?: LogStashConfig;

  @IsOptional()
  @IsTypes([CloudWatchConfig])
  cloudWatch?: CloudWatchConfig;

  @IsOptional()
  @IsTypes([LokiConfig])
  loki?: LokiConfig;

  @IsOptional()
  @IsTypes([PinoMongoConfig])
  mongo?: PinoMongoConfig;

  constructor(props: LogConfig) {
    Object.assign(this, props);
    this.contexts = this.setSearchValue(props?.contexts);
    if (props.logStash) this.logStash = new LogStashConfig(props?.logStash);
    if (props.fluentd) this.fluentd = new FluentdConfig(props?.fluentd);
    if (props.cloudWatch) this.cloudWatch = new CloudWatchConfig(props?.cloudWatch);
    if (props.loki) this.loki = new LokiConfig(props?.loki);
    if (props.mongo) this.mongo = new PinoMongoConfig(props?.mongo);
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }
}
