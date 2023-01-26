import { ClientConfig, IsNotEmpty, IsOptional, IsString } from '@baotg/core';

export class MailerConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  apiKey!: string;

  @IsString()
  @IsNotEmpty()
  domain!: string;

  @IsString()
  @IsOptional()
  sender?: string;

  constructor(props: MailerConfig) {
    super(props);
    Object.assign(this, { ...props });
  }
}
