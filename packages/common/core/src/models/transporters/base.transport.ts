import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, toBool } from '@joktec/utils';
import { MicroserviceOptions } from '@nestjs/microservices';

export enum TransportType {
  TCP = 'tcp',
  RMQ = 'rmq',
  NATS = 'nats',
  REDIS = 'redis',
  GRPC = 'gRPC',
  MQTT = 'mqtt',
  KAFKA = 'kafka',
}

export const BaseTransportName = 'default';

export abstract class BaseTransport {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(TransportType)
  @IsNotEmpty()
  transport: TransportType;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  protected constructor(props: Partial<BaseTransport>) {
    Object.assign(this, {
      enable: toBool(props.enable, true),
      transport: props.transport,
      name: props.name || `${BaseTransportName}_${props.transport}`,
    });
  }

  public abstract getOptions(): MicroserviceOptions;
}
