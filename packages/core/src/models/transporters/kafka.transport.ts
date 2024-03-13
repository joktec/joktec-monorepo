import { KafkaOptions as NestKafkaOptions, Transport } from '@nestjs/microservices';
import { BrokersFunction, CompressionTypes } from '@nestjs/microservices/external/kafka.interface';
import { IsNotEmpty, IsObject } from 'class-validator';
import { BaseTransport } from './base.transport';

export interface KafkaOptions {
  postfixId?: string;
  client?: {
    brokers: string[] | BrokersFunction;
    [key: string]: any;
  };
  consumer?: {
    groupId: string;
    [key: string]: any;
  };
  run?: {
    autoCommit?: boolean;
    autoCommitInterval?: number | null;
    autoCommitThreshold?: number | null;
    eachBatchAutoResolve?: boolean;
    partitionsConsumedConcurrently?: number;
  };
  subscribe?: { fromBeginning?: boolean };
  producer?: { [key: string]: any };
  send?: { acks?: number; timeout?: number; compression?: CompressionTypes };
  serializer?: any;
  deserializer?: any;
  parser?: { keepBinary?: boolean };
  producerOnlyMode?: boolean;
}

export class KafkaTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: KafkaOptions;

  constructor(props: Partial<KafkaTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestKafkaOptions {
    return { transport: Transport.KAFKA, options: this.options };
  }
}
