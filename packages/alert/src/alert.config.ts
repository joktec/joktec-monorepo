import { ClientConfig, IsNotEmpty, IsString } from '@joktec/core';

export class AlertConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  chatId!: string;

  @IsString()
  @IsNotEmpty()
  service!: string;

  @IsString()
  @IsNotEmpty()
  token!: string;

  constructor(props: AlertConfig) {
    super(props);
    Object.assign(this, props);
  }
}
