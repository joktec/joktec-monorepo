import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { DestinationStream } from 'pino';
import { FluentdConfig } from './fluentd/fluentd.config';
import { LogFormat, LogLevel } from './log.enum';
import { LogStashConfig } from './logstash/logstash.config';
import { PinoMongoConfig } from './mongodb/pino-mongo.config';
import { IsTypes } from '../../validation';

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
  @IsTypes(FluentdConfig)
  fluentd?: FluentdConfig;

  @IsOptional()
  @IsTypes(LogStashConfig)
  logStash?: LogStashConfig;

  @IsOptional()
  @IsTypes(PinoMongoConfig)
  mongo?: PinoMongoConfig;

  constructor(props: LogConfig) {
    Object.assign(this, props);
    this.contexts = this.setSearchValue(props?.contexts);
    if (props.logStash) this.logStash = new LogStashConfig(props?.logStash);
    if (props.fluentd) this.fluentd = new FluentdConfig(props?.fluentd);
    if (props.mongo) this.mongo = new PinoMongoConfig(props?.mongo);
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }
}
