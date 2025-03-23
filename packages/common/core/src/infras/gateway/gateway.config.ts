import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HelmetOptions } from 'helmet';
import { SwaggerConfig } from '../../decorators';

export class StaticConfig {
  @IsString()
  @IsNotEmpty()
  staticPath?: string = './public';

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  excludePath?: string[] = [];

  @IsString()
  @IsNotEmpty()
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

  @IsTypes(StaticConfig)
  @IsOptional()
  static?: StaticConfig;

  @IsTypes(SwaggerConfig)
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
