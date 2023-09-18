import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HelmetOptions } from 'helmet';
import { SwaggerConfig } from '../../swagger';
import { toArray, toBool, toInt } from '../../utils';
import { IsTypes } from '../../validation';

export class StaticConfig {
  staticPath?: string;
  excludePath?: string[];
  viewPath?: string;

  constructor(props?: Partial<StaticConfig>) {
    Object.assign(this, {
      staticPath: props?.staticPath || './public',
      excludePath: toArray(props?.excludePath),
      viewPath: props?.viewPath || './views',
    });
  }
}

export class GatewayConfig {
  @IsNumber()
  @IsNotEmpty()
  port!: number;

  @IsString()
  @IsOptional()
  contextPath?: string;

  @IsTypes([StaticConfig])
  @IsOptional()
  static?: StaticConfig;

  @IsTypes([SwaggerConfig])
  @IsOptional()
  swagger?: SwaggerConfig;

  @IsBoolean()
  @IsOptional()
  csrf?: boolean;

  @IsOptional()
  cors?: CorsOptions;

  @IsOptional()
  helmet?: HelmetOptions;

  constructor(props?: Partial<GatewayConfig>) {
    Object.assign(this, {
      ...props,
      port: toInt(props?.port, 9010),
      csrf: toBool(props?.csrf, false),
      contextPath: props?.contextPath || '',
      swagger: props?.swagger && new SwaggerConfig(props.swagger),
      static: props?.static && new StaticConfig(props.static),
    });
  }
}
