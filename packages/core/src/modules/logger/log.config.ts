import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsTypes, toArray } from '@joktec/utils';
import { LogSocket } from './log-socket.config';
import { LogTransport } from './log-transport.config';
import { LogLevel } from './log.enum';

export class LogConfig {
  @IsNotEmpty()
  @IsEnum(LogLevel)
  level?: LogLevel = 'info';

  @IsOptional()
  @IsTypes(['string', 'string[]'])
  contexts?: string | string[];

  @IsOptional()
  @IsString()
  fileDir?: string;

  @IsOptional()
  socket?: LogSocket | LogSocket[];

  @IsOptional()
  transport?: LogTransport | LogTransport[];

  @IsOptional()
  @IsTypes(['string', 'string[]'])
  hideContexts?: string | string[];

  @IsOptional()
  @IsBoolean()
  hideObject?: boolean = false;

  @IsOptional()
  @IsBoolean()
  hideWarning?: boolean = true;

  @IsOptional()
  @IsBoolean()
  hideFilter?: boolean = true;

  constructor(props: LogConfig) {
    Object.assign(this, {
      ...props,
      contexts: this.setSearchValue(props?.contexts),
      socket: toArray(props?.socket).map(s => new LogSocket(s)),
      transport: toArray(props?.transport).map(t => new LogTransport({ ...t, level: t.level || props.level })),
    });
  }

  setSearchValue(contexts: string | string[]): string {
    if (Array.isArray(contexts)) {
      return contexts.map(context => `context == '${context}'`).join('||');
    }
    return contexts ? `context == '${contexts}'` : contexts;
  }

  filterLogs(logObject: string | Record<string, any>): boolean {
    const contexts = toArray<string>(this.hideContexts || []);
    if (!contexts.length) return true;
    if (typeof logObject === 'string' && contexts.includes(logObject)) return false;
    return !(typeof logObject === 'object' && contexts.includes(logObject.context));
  }
}
