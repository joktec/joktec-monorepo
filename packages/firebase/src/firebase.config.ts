import fs from 'fs';
import { ClientConfig, InternalServerException } from '@joktec/core';
import { IsNotEmpty, IsObject, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { ServiceAccount } from 'firebase-admin/lib/app/credential';
import { isString } from 'lodash';

export class FirebaseCredential implements ServiceAccount {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  privateKey?: string;

  constructor(props: FirebaseCredential) {
    Object.assign(this, props);
  }
}

export class FirebaseConfig extends ClientConfig {
  @IsNotEmpty()
  @IsTypes(['string', FirebaseCredential])
  credential!: string | FirebaseCredential;

  @IsOptional()
  @IsObject()
  databaseAuthVariableOverride?: object;

  @IsOptional()
  @IsString()
  databaseURL?: string;

  @IsOptional()
  @IsString()
  serviceAccountId?: string;

  @IsOptional()
  @IsString()
  storageBucket?: string;

  @IsOptional()
  @IsString()
  projectId?: string;

  constructor(props: FirebaseConfig) {
    super(props);
    const { credential } = props;
    if (isString(credential) && !fs.existsSync(credential)) {
      throw new InternalServerException('Firebase credential file not found!');
    }

    Object.assign(this, {
      ...props,
      credential: isString(credential) ? credential : new FirebaseCredential(credential),
    });
  }
}
