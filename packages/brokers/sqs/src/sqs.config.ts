import { ClientConfig, LogService } from '@joktec/core';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/utils';

export class SqsConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsOptional()
  @IsString()
  accessKey?: string;

  @IsOptional()
  @IsString()
  secretKey?: string;

  @IsOptional()
  @IsString()
  sessionToken?: string;

  @IsOptional()
  @IsString()
  endpoint?: string;

  @IsOptional()
  @IsBoolean()
  sslEnabled?: boolean;

  @IsOptional()
  @IsInt()
  maxRetries?: number;

  @IsOptional()
  @IsInt()
  timeout?: number;

  constructor(props?: SqsConfig) {
    super(props);
    Object.assign(this, {
      region: props.region || 'ap-southeast-1',
      sslEnabled: toBool(props.sslEnabled, true),
      maxRetries: toInt(props.maxRetries, 3),
      timeout: toInt(props.timeout, 30000),
      ...props,
    });
  }

  bindingLogger(logger: LogService) {
    const log =
      (method: 'trace' | 'debug' | 'info' | 'warn' | 'error') =>
      (...args: any[]) => {
        for (const arg of args) {
          if (typeof arg === 'string') {
            logger[method]('`%s` SQS client - %s', this.conId, arg);
            continue;
          }
          const isSkipMethod = method === 'trace' || method === 'debug' || method === 'info';
          if (isSkipMethod && arg.commandName === 'ReceiveMessageCommand') continue;
          logger[method](arg, '`%s` SQS client command %s', this.conId, arg.commandName);
        }
      };
    return { trace: log('trace'), debug: log('debug'), info: log('info'), warn: log('warn'), error: log('error') };
  }
}
