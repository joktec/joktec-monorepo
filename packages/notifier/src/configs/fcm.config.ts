import { IsNotEmpty, IsString } from '@joktec/core';

export interface IFcmConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  databaseUrl: string;
}

export class FcmConfig implements IFcmConfig {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  clientEmail!: string;

  @IsString()
  @IsNotEmpty()
  privateKey!: string;

  @IsString()
  @IsNotEmpty()
  databaseUrl!: string;

  constructor(props: IFcmConfig) {
    Object.assign(this, { ...props });
  }
}
