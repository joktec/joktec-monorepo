import { ClientConfig, LogService } from '@joktec/core';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes, toBool, toInt } from '@joktec/utils';

export class SqsAssumeRoleConfig {
  @IsString()
  @IsOptional()
  arn?: string;

  @IsString()
  @IsOptional()
  sessionName?: string = 'AssumeRoleSession';

  @IsString()
  @IsOptional()
  externalId?: string;

  @IsInt()
  @IsOptional()
  durationSeconds?: number = 3600;

  constructor(props?: Partial<SqsAssumeRoleConfig>) {
    Object.assign(this, props);
  }
}

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

  @IsOptional()
  @IsBoolean()
  ping?: boolean;

  @IsOptional()
  @IsTypes(SqsAssumeRoleConfig)
  assumeRole?: SqsAssumeRoleConfig;

  constructor(props?: SqsConfig) {
    super(props);
    Object.assign(this, {
      region: props.region || 'ap-southeast-1',
      sslEnabled: toBool(props.sslEnabled, true),
      maxRetries: toInt(props.maxRetries, 3),
      timeout: toInt(props.timeout, 30000),
      ...props,
    });
    if (props.assumeRole) this.assumeRole = new SqsAssumeRoleConfig(props.assumeRole);
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
