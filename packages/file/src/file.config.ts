import { ClientConfig } from '@joktec/core';
import { IsNotEmpty, IsString } from '@joktec/utils';

export class FileConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  directory: string;

  constructor(props: FileConfig) {
    super(props);
    this.directory = props.directory ? `${props.directory}/` : '';
  }
}
