import { TcpOptions as NestTcpOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { BaseTransport } from './base.transport';

export interface TcpOptions {
  host?: string;
  port?: number;
  retryAttempts?: number;
  retryDelay?: number;
  serializer?: any;
  tlsOptions?: any;
  deserializer?: any;
  socketClass?: any;
}

export class TcpTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: TcpOptions;

  constructor(props: Partial<TcpTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestTcpOptions {
    return { transport: Transport.TCP, options: this.options };
  }
}
