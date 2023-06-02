import { IsString, IsOptional, IsInt, toInt } from '@joktec/core';
import { HttpConfig } from '@joktec/http';
import mergeDeep from 'merge-deep';

export class ElasticConfig extends HttpConfig {
  @IsOptional()
  @IsString()
  protocol?: string;

  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  @IsInt()
  port?: number;

  constructor(props: ElasticConfig) {
    super(props);
    mergeDeep(this, props, {
      protocol: props?.protocol || 'http',
      host: props?.host || 'localhost',
      port: toInt(props?.port, 9200),
    });
    if (!this.baseURL) {
      this.baseURL = `${props.protocol}://${props.host}:${props.port}`;
    }
  }
}
