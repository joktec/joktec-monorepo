import { ClientConfig, IsNotEmpty, IsString } from '@baotg/core';

export class SlackConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  team: string;

  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(props: SlackConfig) {
    super(props);
    Object.assign(this, props);
  }
}
