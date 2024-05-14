import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DestinationStream } from 'pino';
import { toArray } from '../../utils';
import { LogSocket } from './log-socket.config';
import { LogTransport } from './log-transport.config';
import { LogLevel } from './log.enum';

export class LogConfig {
  @IsNotEmpty()
  @IsEnum(LogLevel)
  level?: LogLevel = 'info';

  @IsOptional()
  contexts?: string | string[];

  @IsOptional()
  @IsBoolean()
  useFilter?: boolean = false;

  @IsOptional()
  customStreams?: DestinationStream[] = [];

  @IsOptional()
  @IsString()
  fileDir?: string;

  @IsOptional()
  socket?: LogSocket | LogSocket[];

  @IsOptional()
  transport?: LogTransport | LogTransport[];

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
}
