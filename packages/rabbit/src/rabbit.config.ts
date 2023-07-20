import { ClientConfig, RetryOptions, toInt } from '@joktec/core';
import { Options } from 'amqplib/properties';

export class RabbitConfig extends ClientConfig implements Options.Connect {
  hostname?: string;
  protocol?: string;
  port?: number;
  username?: string;
  password?: string;
  locale?: string;
  frameMax?: number;
  heartbeat?: number;
  vhost?: string;
  retry?: RetryOptions;

  constructor(props: RabbitConfig) {
    super(props);
    Object.assign(this, {
      hostname: props?.hostname ?? 'localhost',
      protocol: props?.protocol ?? 'amqp',
      port: toInt(props?.port, 5672),
      username: props?.username ?? 'guest',
      password: props?.password ?? 'guest',
      frameMax: toInt(props.frameMax),
      heartbeat: toInt(props.heartbeat),
      ...props,
    });
  }
}
