import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export enum MicroTransport {
  TCP = 'tcp',
  RMQ = 'rmq',
  NATS = 'nats',
  REDIS = 'redis',
  GRPC = 'gRPC',
  MQTT = 'mqtt',
  KAFKA = 'kafka',
}

type TcpOptions = { host?: string; port?: number; retryAttempts?: number; retryDelay?: number };
type GrpcOptions = {
  filePattern?: string;
  url?: string;
  package?: string | string[];
  protoPath?: string | string[];
  protoLoader?: string;
};
type RmqOptions = {
  urls?: string[] | RmqUrl[];
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
};

export type MicroOptions = {
  [MicroTransport.TCP]?: TcpOptions | TcpOptions[];
  [MicroTransport.RMQ]?: RmqOptions | RmqOptions[];
  [MicroTransport.NATS]?: any | any[];
  [MicroTransport.REDIS]?: any | any[];
  [MicroTransport.MQTT]?: any | any[];
  [MicroTransport.KAFKA]?: any | any[];
  [MicroTransport.GRPC]?: GrpcOptions | GrpcOptions[];
};

export class MicroConfig {
  @IsNumber()
  @IsNotEmpty()
  port?: number = 8010;

  @IsBoolean()
  @IsOptional()
  inheritAppConfig?: boolean = true;

  @IsOptional()
  @IsObject()
  microservices?: MicroOptions;

  constructor(props: Partial<MicroConfig>) {
    Object.assign(this, props);
  }
}
