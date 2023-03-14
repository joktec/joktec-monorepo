import { IsNotEmpty, IsOptional, IsString } from '@joktec/core';

export interface ISnsConfig {
  accessKey: string;
  secretKey: string;
  region?: string;
}

export class SnsConfig implements ISnsConfig {
  @IsString()
  @IsNotEmpty()
  accessKey!: string;

  @IsString()
  @IsNotEmpty()
  secretKey!: string;

  @IsString()
  @IsOptional()
  region?: string;

  constructor(props: ISnsConfig) {
    Object.assign(this, { ...props });
  }
}
