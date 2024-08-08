import { IsTypes, IsString, IsNotEmpty } from '@joktec/core';

export class NotifierMpnsOption {
  @IsString()
  @IsNotEmpty()
  client_id!: string;

  @IsString()
  @IsNotEmpty()
  client_secret!: string;

  constructor(props?: Partial<NotifierMpnsOption>) {
    Object.assign(this, props);
  }
}

export class NotifierMpns {
  @IsNotEmpty()
  @IsTypes(NotifierMpnsOption)
  options!: NotifierMpnsOption;

  constructor(props: NotifierMpns) {
    Object.assign(this, {
      ...props,
      options: new NotifierMpnsOption(props?.options),
    });
  }
}
