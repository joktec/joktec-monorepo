import { ClientConfig, IsTypes } from '@joktec/core';
import { IsNotEmpty, IsObject, IsOptional, IsString, toBool, toInt } from '@joktec/utils';
import { CollectionImportOptions } from 'arangojs/collection';
import { LoadBalancingStrategy } from 'arangojs/connection';

export class BasicCredentials {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  password?: string;

  constructor(props: BasicCredentials) {
    this.username = props.username;
    this.password = props.password;
  }
}

export class BearerCredentials {
  @IsString()
  @IsNotEmpty()
  token!: string;

  constructor(props: BearerCredentials) {
    this.token = props.token;
  }
}

export type CollectionImportOpts = CollectionImportOptions & {
  type?: 'documents' | 'list' | 'auto';
};

export class ArangoConfig extends ClientConfig {
  @IsTypes(['string', 'string[]'])
  url: string | string[];

  @IsString()
  @IsOptional()
  databaseName?: string;

  @IsOptional()
  @IsTypes([BasicCredentials, BearerCredentials])
  auth?: BasicCredentials | BearerCredentials;

  @IsOptional()
  arangoVersion?: number;

  @IsOptional()
  loadBalancingStrategy?: LoadBalancingStrategy;

  @IsOptional()
  maxRetries?: false | number;

  @IsOptional()
  agent?: any;

  @IsOptional()
  @IsObject()
  agentOptions?: object;

  @IsOptional()
  headers?: Headers;

  @IsOptional()
  precaptureStackTraces?: boolean;

  constructor(props: ArangoConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      arangoVersion: toInt(props?.arangoVersion),
      maxRetries: toInt(props?.maxRetries),
      precaptureStackTraces: toBool(props?.precaptureStackTraces),
    });
  }
}
