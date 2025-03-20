import { ClientConfig } from '@joktec/core';
import { IsNotEmpty, IsString } from '@joktec/utils';

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
