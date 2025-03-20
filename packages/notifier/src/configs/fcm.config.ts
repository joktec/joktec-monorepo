import fs from 'fs';
import { IsTypes } from '@joktec/core';
import { IsNotEmpty, IsOptional, IsString } from '@joktec/utils';
import { isObject, isString } from 'lodash';

export class NotifierFcmCredential {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  privateKey?: string;

  constructor(props: NotifierFcmCredential) {
    Object.assign(this, props);
  }
}

export class NotifierFcm {
  @IsString()
  @IsNotEmpty()
  appName!: string;

  @IsTypes(['string', NotifierFcmCredential])
  @IsNotEmpty()
  credential?: string | NotifierFcmCredential;

  constructor(props: NotifierFcm) {
    Object.assign(this, props);
    if (props.credential) {
      if (isObject(props.credential)) this.credential = new NotifierFcmCredential(props.credential);
      else this.credential = props.credential;
    }
  }

  getCredential() {
    if (isString(this.credential)) {
      const json = JSON.parse(fs.readFileSync(this.credential, 'utf8'));
      return { appName: this.appName, serviceAccountKey: json };
    }
    return { appName: this.appName, credential: this.credential };
  }
}
