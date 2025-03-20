import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional } from '@joktec/utils';
import { IsTypes } from '../../decorators';
import {
  GrpcTransport,
  KafkaTransport,
  MqttTransport,
  NatsTransport,
  parseTransports,
  RedisTransport,
  RmqTransport,
  TcpTransport,
  Transporter,
} from '../../models';

export class MicroConfig {
  @IsInt()
  @IsNotEmpty()
  port?: number = 8010;

  @IsBoolean()
  @IsOptional()
  inheritAppConfig?: boolean = true;

  @IsBoolean()
  @IsOptional()
  httpEnable?: boolean = false;

  @IsOptional()
  @IsArray()
  @IsTypes([TcpTransport, GrpcTransport, RmqTransport, RedisTransport, MqttTransport, NatsTransport, KafkaTransport], {
    each: true,
  })
  transports?: Transporter[] = [];

  constructor(props: Partial<MicroConfig>) {
    Object.assign(this, props);
    this.transports = parseTransports(props.transports).map(transport => {
      if (transport instanceof TcpTransport || transport instanceof GrpcTransport) {
        transport.options = { ...transport.options, port: props.port ?? this.port };
      }
      return transport;
    });
  }
}
