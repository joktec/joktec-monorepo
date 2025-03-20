import { ClientProxyFactory } from '@nestjs/microservices';
import { head } from 'lodash';
import { ConfigService } from '../../modules';
import { toArray } from '@joktec/utils';
import { Clazz } from '../base.dto';
import { TransportType } from './base.transport';
import { GrpcTransport } from './grpc.transport';
import { KafkaTransport } from './kafka.transport';
import { MqttTransport } from './mqtt.transport';
import { NatsTransport } from './nats.transport';
import { RedisTransport } from './redis.transport';
import { RmqTransport } from './rmq.transport';
import { TcpTransport } from './tcp.transport';

export * from './base.transport';
export * from './grpc.transport';
export * from './kafka.transport';
export * from './mqtt.transport';
export * from './nats.transport';
export * from './redis.transport';
export * from './rmq.transport';
export * from './tcp.transport';

export type Transporter =
  | TcpTransport
  | GrpcTransport
  | RmqTransport
  | RedisTransport
  | MqttTransport
  | NatsTransport
  | KafkaTransport;

export function parseTransports(transports: Partial<Transporter>[]): Transporter[] {
  const TransportClazz: { [key: string]: Clazz } = {
    [TransportType.TCP]: TcpTransport,
    [TransportType.GRPC]: GrpcTransport,
    [TransportType.RMQ]: RmqTransport,
    [TransportType.NATS]: NatsTransport,
    [TransportType.REDIS]: RedisTransport,
    [TransportType.MQTT]: MqttTransport,
    [TransportType.KAFKA]: KafkaTransport,
  };
  return toArray(transports).map(transport => new TransportClazz[transport.transport](transport));
}

export const TransportProxyFactory = (provideName: string, transportName: string) => {
  return {
    provide: provideName,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const transports: Partial<Transporter>[] = configService.get('transports');
      const transport: Transporter = head(parseTransports(transports).filter(t => t.name === transportName));
      return ClientProxyFactory.create(transport.getOptions() as any);
    },
  };
};
