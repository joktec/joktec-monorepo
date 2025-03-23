import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, toBool } from '@joktec/utils';
import { LogLevel } from './log.enum';

export class LogTransport {
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @IsString()
  @IsNotEmpty()
  target!: string;

  @IsEnum(LogLevel)
  @IsOptional()
  level?: LogLevel;

  @IsOptional()
  @IsObject()
  options?: Record<string, any>;

  constructor(props: Partial<LogTransport>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, true),
    });
  }
}
