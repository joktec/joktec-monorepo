import { ClientConfig, toBool, toInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/core';
import { AgentOptions, Config, Headers, LoadBalancingStrategy, RequestInterceptors } from 'arangojs/connection';
import { CollectionImportOptions } from 'arangojs/collection';

class BasicAuthCredentials {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  password?: string;

  constructor(props) {
    this.username = props.username;
    this.password = props.password;
  }
}

class BearerAuthCredentials {
  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(props) {
    this.token = props.token;
  }
}

export type CollectionImportOpts = CollectionImportOptions & {
  type?: 'documents' | 'list' | 'auto';
};

export class ArangoConfig extends ClientConfig implements Config {
  @IsTypes(['string', 'string[]'])
  url: string | string[];

  @IsString()
  @IsOptional()
  databaseName?: string;

  @IsOptional()
  @IsTypes([BasicAuthCredentials, BearerAuthCredentials])
  auth?: BasicAuthCredentials | BearerAuthCredentials;

  @IsOptional()
  arangoVersion?: number;

  @IsOptional()
  loadBalancingStrategy?: LoadBalancingStrategy;

  @IsOptional()
  maxRetries?: false | number;

  @IsOptional()
  agent?: any;

  @IsOptional()
  agentOptions?: AgentOptions & RequestInterceptors;

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
