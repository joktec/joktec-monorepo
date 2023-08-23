import fs from 'fs';
import { AgentOptions } from 'http';
import {
  ClientConfig,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsTypes,
  IsObject,
  InternalServerException,
} from '@joktec/core';
import { ServiceAccount } from 'firebase-admin/lib/app/credential';
import { isString } from 'lodash';

export class FirebaseAgent implements AgentOptions {
  constructor(props: FirebaseAgent) {
    Object.assign(this, props);
  }
}

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
  @IsTypes([String, FirebaseCredential])
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

  @IsOptional()
  @IsTypes([FirebaseAgent])
  httpAgent?: FirebaseAgent;

  constructor(props: FirebaseConfig) {
    super(props);
    const { credential, httpAgent } = props;
    if (isString(credential) && !fs.existsSync(credential)) {
      throw new InternalServerException('Firebase credential file not found!');
    }

    Object.assign(this, {
      ...props,
      credential: isString(credential) ? credential : new FirebaseCredential(credential),
      httpAgent: httpAgent && new FirebaseAgent(httpAgent),
    });
  }
}
