import { toBool, toInt } from '../../utils';

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

export class MicroConfig {
  port!: number;
  inheritAppConfig?: boolean;
  microservices?: IMicroserviceOptions;

  constructor(props: Partial<MicroConfig>) {
    Object.assign(this, {
      ...props,
      port: toInt(props.port, 8010),
      inheritAppConfig: toBool(props.inheritAppConfig, true),
    });
  }
}
