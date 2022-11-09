import { FluentdConfig } from './fluentd/fluentd.config';
import { LogStashConfig } from './logtash/logtash.config';
import { LogLevel } from './log.level';

export class LogConfig {
  level: LogLevel;
  contexts: string | string[];
  fluentd?: FluentdConfig;
  logStash?: LogStashConfig;

  constructor(props: LogConfig) {
    this.level = props?.level ?? 'info';
    this.contexts = this.setSearchValue(props?.contexts);
    this.logStash = props?.logStash ? new LogStashConfig(props?.logStash) : null;
    this.fluentd = props?.fluentd ? new FluentdConfig(props?.fluentd) : null;
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }
}
