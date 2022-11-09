import { MicroserviceOptions } from '@nestjs/microservices';
import { NestHybridApplicationOptions } from '@nestjs/common/interfaces';

export const DEFAULT_MICRO_PORT = 8010;

export enum MicroTransport {
  TCP = 'tcp',
  REDIS = 'redis',
  NATS = 'nats',
  MQTT = 'mqtt',
  GRPC = 'grpc',
  RMQ = 'rmq',
  KAFKA = 'kafka',
}

export interface MicroConfig {
  name: string;
  port: number;
  transport: MicroTransport;
  microOptions: MicroserviceOptions;
  hybridOptions?: NestHybridApplicationOptions;
}

const a: MicroConfig = {
  name: 'Jobhopin.ActivityMicroservice',
  port: 3000,
  transport: MicroTransport.RMQ,
  microOptions: {
    options: {
      urls: [process.env.ACTIVITY_SERVICE_RABITMQ_URL],
      queue: process.env.ACTIVITY_SERVICE_RABITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  },
};
