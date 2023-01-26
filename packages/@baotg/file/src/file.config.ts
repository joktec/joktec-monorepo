import { ClientConfig, IsNotEmpty, IsString } from '@baotg/core';

export class FileConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  directory: string;

  constructor(props: FileConfig) {
    super(props);
    this.directory = props.directory ? `${props.directory}/` : '';
  }
}
