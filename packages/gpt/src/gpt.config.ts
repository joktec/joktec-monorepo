import { ClientConfig, IsNotEmpty, IsString } from '@joktec/core';

export class GptConfig extends ClientConfig {
  @IsNotEmpty()
  @IsString()
  apiKey!: string;

  constructor(props: GptConfig) {
    super(props);
    Object.assign(this, props);
  }
}
