import { IsBoolean, IsNotEmpty, IsOptional, IsString } from '@joktec/utils';

export class NotifierGcm {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsBoolean()
  @IsOptional()
  phonegap?: boolean = false;

  constructor(props: NotifierGcm) {
    Object.assign(this, props);
  }
}
