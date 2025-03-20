import { IsNotEmpty, IsObject } from '@joktec/utils';
import { RmqOptions as NestRmqOptions, Transport } from '@nestjs/microservices';
import { BaseTransport } from './base.transport';

export interface RmqOptions {
  urls?: string[];
  queue?: string;
  prefetchCount?: number;
  noAck?: boolean;
  replyQueue?: string;
  persistent?: boolean;
  noAssert?: boolean;
  queueOptions?: {
    durable?: boolean;
    [key: string]: any;
  };
}

export class RmqTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: RmqOptions;

  constructor(props: Partial<RmqTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestRmqOptions {
    return { transport: Transport.RMQ, options: this.options };
  }
}
