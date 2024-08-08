import { IsNotEmpty, IsString } from '@joktec/core';

export class NotifierAdm {
  @IsString()
  @IsNotEmpty()
  client_id!: string;

  @IsString()
  @IsNotEmpty()
  client_secret!: string;

  constructor(props: NotifierAdm) {
    Object.assign(this, props);
  }
}
