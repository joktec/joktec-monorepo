import { ClientConfig } from '@joktec/core';
import { IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { MagikaOptions } from 'magika/src/magikaOptions';

export class MagikaConfig implements MagikaOptions {
  @IsString()
  @IsOptional()
  modelURL?: string;

  @IsString()
  @IsOptional()
  modelPath?: string;

  @IsString()
  @IsOptional()
  configURL?: string;

  @IsString()
  @IsOptional()
  configPath?: string;

  constructor(props?: Partial<MagikaConfig>) {
    Object.assign(this, props);
  }
}

export class FileConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  directory: string;

  @IsTypes(MagikaConfig)
  @IsOptional()
  magika?: MagikaConfig;

  constructor(props: FileConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      directory: props.directory ? `${props.directory}/` : '',
      magika: props.magika ? new MagikaConfig(props.magika) : undefined,
    });
  }
}
