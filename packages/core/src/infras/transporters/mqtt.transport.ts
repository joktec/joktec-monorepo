import { MqttOptions as NestMqttOptions, Transport } from '@nestjs/microservices';
import { IsNotEmpty, IsObject } from 'class-validator';
import { BaseTransport } from './base.transport';

export interface MqttOptions {
  url?: string;
  serializer?: any;
  deserializer?: any;
  subscribeOptions?: {
    qos: 0 | 1 | 2;
    nl?: boolean;
    rap?: boolean;
    rh?: number;
  };
  userProperties?: Record<string, string | string[]>;

  [key: string]: any;
}

export class MqttTransport extends BaseTransport {
  @IsNotEmpty()
  @IsObject()
  options: MqttOptions;

  constructor(props: Partial<MqttTransport>) {
    super(props);
    Object.assign(this, props);
  }

  getOptions(): NestMqttOptions {
    return { transport: Transport.MQTT, options: this.options };
  }
}
