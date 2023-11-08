import { ClientConfig, IsInt, IsNotEmpty, IsOptional, IsString } from '@joktec/core';

export class RabbitConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  hostname?: string = 'localhost';

  @IsString()
  @IsNotEmpty()
  protocol?: string = 'amqp';

  @IsInt()
  @IsNotEmpty()
  port?: number = 5672;

  @IsString()
  @IsOptional()
  username?: string = 'guest';

  @IsString()
  @IsOptional()
  password?: string = 'guest';

  @IsString()
  @IsOptional()
  locale?: string;

  @IsInt()
  @IsOptional()
  frameMax?: number;

  @IsInt()
  @IsOptional()
  heartbeat?: number;

  @IsString()
  @IsOptional()
  vhost?: string = '/';

  constructor(props: RabbitConfig) {
    super(props);
    Object.assign(this, props);
  }
}
