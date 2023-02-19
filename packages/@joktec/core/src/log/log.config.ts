import { FluentdConfig } from './fluentd/fluentd.config';
import { LogStashConfig } from './logstash/logstash.config';
import { LogLevel } from './log.level';
import { CloudWatchConfig } from './cloudwatch/cloudwatch.config';

export class LogConfig {
  level: LogLevel;
  output: 'pretty' | 'json';
  contexts: string | string[];
  fluentd?: FluentdConfig;
  logStash?: LogStashConfig;
  cloudWatch?: CloudWatchConfig;

  constructor(props: LogConfig) {
    this.level = props?.level ?? 'info';
    this.output = props?.output || 'pretty';
    this.contexts = this.setSearchValue(props?.contexts);
    this.logStash = props?.logStash ? new LogStashConfig(props?.logStash) : null;
    this.fluentd = props?.fluentd ? new FluentdConfig(props?.fluentd) : null;
    this.cloudWatch = props?.cloudWatch ? new CloudWatchConfig(props?.cloudWatch) : null;
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }
}
