export const DEFAULT_MICRO_PORT = 8010;

export enum MicroTransport {
  TCP = 'tcp',
  RMQ = 'rmq',
  NATS = 'nats',
  REDIS = 'redis',
  GRPC = 'gRPC',
  MQTT = 'mqtt',
  KAFKA = 'kafka',
}

export type IMicroserviceOptions = {
  [transport in MicroTransport]: Record<string, any>;
};

export interface MicroConfig {
  port: number;
  inheritAppConfig?: boolean;
  microservices?: IMicroserviceOptions;
}
