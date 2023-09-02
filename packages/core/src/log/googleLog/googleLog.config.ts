import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { toBool } from '../../utils';
import { IsTypes } from '../../validation';

class Credential {
  @IsNotEmpty()
  @IsString()
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;
}

export class GoogleLogConfig {
  @IsNotEmpty()
  @IsBoolean()
  enable!: boolean;

  @IsNotEmpty()
  @IsString()
  projectId!: string;

  @IsNotEmpty()
  @IsTypes([String, Credential])
  credential!: string | Credential;

  constructor(props: GoogleLogConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props.enable, false),
    });
  }
}
