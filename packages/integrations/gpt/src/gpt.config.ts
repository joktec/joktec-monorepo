import { ClientConfig } from '@joktec/core';
import { IsNotEmpty, IsString } from '@joktec/utils';

export class GptConfig extends ClientConfig {
  @IsNotEmpty()
  @IsString()
  apiKey!: string;

  constructor(props: GptConfig) {
    super(props);
    Object.assign(this, props);
  }
}
