import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HelmetOptions } from 'helmet';
import { SwaggerConfig } from '../../swagger';
import { IsTypes } from '../../validation';

export class StaticConfig {
  staticPath?: string = './public';
  excludePath?: string[] = [];
  viewPath?: string = './views';

  constructor(props?: Partial<StaticConfig>) {
    Object.assign(this, props);
  }
}

export class GatewayConfig {
  @IsInt()
  @IsNotEmpty()
  port?: number = 9010;

  @IsString()
  @IsOptional()
  contextPath?: string = '';

  @IsTypes([StaticConfig])
  @IsOptional()
  static?: StaticConfig;

  @IsTypes([SwaggerConfig])
  @IsOptional()
  swagger?: SwaggerConfig;

  @IsBoolean()
  @IsOptional()
  csrf?: boolean = false;

  @IsOptional()
  cors?: CorsOptions;

  @IsOptional()
  helmet?: HelmetOptions;

  constructor(props?: Partial<GatewayConfig>) {
    Object.assign(this, props);
    if (props?.swagger) this.swagger = new SwaggerConfig(props.swagger);
    if (props?.static) this.static = new StaticConfig(props.static);
  }
}
