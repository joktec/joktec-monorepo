import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { toBool, toInt } from '../../utils';
import { LogSocketMode } from './log.enum';

export class LogSocket {
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @IsEnum(LogSocketMode)
  @IsOptional()
  mode?: LogSocketMode;

  @IsString()
  @IsNotEmpty()
  host!: string;

  @IsInt()
  @IsNotEmpty()
  port!: number;

  @IsOptional()
  @IsBoolean()
  reconnect?: boolean;

  @IsOptional()
  @IsNumber()
  reconnectTries?: number;

  constructor(props: Partial<LogSocket>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, true),
      mode: props?.mode || LogSocketMode.TCP,
      host: props?.host || 'localhost',
      port: toInt(props?.port, 514),
    });
  }
}
