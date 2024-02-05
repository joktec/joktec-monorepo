import { NatsOptions as NestNatsOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { BaseTransport } from './base.transport';

export interface NatsOptions {
  headers?: Record<string, string>;
  authenticator?: any;
  debug?: boolean;
  ignoreClusterUpdates?: boolean;
  inboxPrefix?: string;
  encoding?: string;
  name?: string;
  user?: string;
  pass?: string;
  maxPingOut?: number;
  maxReconnectAttempts?: number;
  reconnectTimeWait?: number;
  reconnectJitter?: number;
  reconnectJitterTLS?: number;
  reconnectDelayHandler?: any;
  servers?: string[] | string;
  nkey?: any;
  reconnect?: boolean;
  pedantic?: boolean;
  tls?: any;
  queue?: string;
  serializer?: any;
  deserializer?: any;
  userJWT?: string;
  nonceSigner?: any;
  userCreds?: any;
  useOldRequestStyle?: boolean;
  pingInterval?: number;
  preserveBuffers?: boolean;
  waitOnFirstConnect?: boolean;
  verbose?: boolean;
  noEcho?: boolean;
  noRandomize?: boolean;
  timeout?: number;
  token?: string;
  yieldTime?: number;
  tokenHandler?: any;

  [key: string]: any;
}

export class NatsTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: NatsOptions;

  constructor(props: Partial<NatsTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestNatsOptions {
    return { transport: Transport.NATS, options: this.options };
  }
}
