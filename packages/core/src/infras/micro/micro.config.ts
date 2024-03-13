import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
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
import { toBool, toInt } from '../../utils';
import { IsTypes } from '../../validation';

export class MicroConfig {
  @IsInt()
  @IsNotEmpty()
  port?: number;

  @IsBoolean()
  @IsOptional()
  inheritAppConfig?: boolean;

  @IsBoolean()
  @IsOptional()
  httpEnable?: boolean;

  @IsOptional()
  @IsArray()
  @IsTypes([TcpTransport, GrpcTransport, RmqTransport, RedisTransport, MqttTransport, NatsTransport, KafkaTransport], {
    each: true,
  })
  transports?: Transporter[];

  constructor(props: Partial<MicroConfig>) {
    Object.assign(this, {
      port: toInt(props.port, 8010),
      inheritAppConfig: toBool(props.inheritAppConfig, true),
      httpEnable: toBool(props.httpEnable, false),
    });
    this.transports = parseTransports(props.transports).map(transport => {
      if (transport instanceof TcpTransport || transport instanceof GrpcTransport) {
        transport.options = { ...transport.options, port: props.port ?? this.port };
      }
      return transport;
    });
  }
}
