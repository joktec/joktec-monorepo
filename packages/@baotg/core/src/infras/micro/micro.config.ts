import { RmqOptions } from '@nestjs/microservices';

export const DEFAULT_MICRO_PORT = 8010;

export enum MicroTransport {
  TCP = 'TCP',
  REDIS = 'REDIS',
  NATS = 'NATS',
  MQTT = 'MQTT',
  GRPC = 'GRPC',
  RMQ = 'RMQ',
  KAFKA = 'KAFKA',
}

export interface MicroConfig {
  name?: string;
  port: number;
  transport: MicroTransport;
  inheritAppConfig?: boolean;
  rabbitUrls?: string | string[];
  rabbitQueue?: string;
  rabbitDurable?: boolean;
}

export interface IMicroserviceConfig {
  name: string;
  microserviceOptions: RmqOptions;
}
