import { RedisOptions as NestRedisOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { BaseTransport } from './base.transport';

export interface RedisOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  db?: number;
  retryAttempts?: number;
  retryDelay?: number;
  wildcards?: boolean;
  serializer?: any;
  deserializer?: any;

  [key: string]: any;
}

export class RedisTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: RedisOptions;

  constructor(props: Partial<RedisTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestRedisOptions {
    return { transport: Transport.REDIS, options: this.options };
  }
}
