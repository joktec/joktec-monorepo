import { IsNotEmpty, IsOptional, IsString } from '@joktec/utils';

export class NotifierWns {
  @IsString()
  @IsNotEmpty()
  client_id!: string;

  @IsString()
  @IsNotEmpty()
  client_secret!: string;

  @IsString()
  @IsNotEmpty()
  accessToken!: string;

  @IsString()
  @IsOptional()
  headers?: string;

  @IsString()
  @IsOptional()
  notificationMethod?: string = 'sendTileSquareBlock';

  constructor(props: NotifierWns) {
    Object.assign(this, props);
  }
}
