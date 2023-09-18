import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SwaggerUiOptions } from 'swagger-ui-express';
import { toBool } from '../utils';
import { IsTypes } from '../validation';

export class SwaggerLicense {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  url!: string;

  constructor(props: Partial<SwaggerLicense>) {
    Object.assign(this, {
      name: props?.name || 'MIT',
      url: props?.url || 'https://opensource.org/licenses/MIT',
    });
  }
}

export class SwaggerAuth {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  constructor(props: Partial<SwaggerAuth>) {
    Object.assign(this, props);
  }
}

export class SwaggerConfig {
  @IsBoolean()
  @IsNotEmpty()
  enable!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  server?: string;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsOptional()
  options?: SwaggerUiOptions;

  @IsTypes([SwaggerAuth])
  @IsOptional()
  auth?: SwaggerAuth;

  @IsTypes([SwaggerLicense])
  @IsOptional()
  license?: SwaggerLicense;

  constructor(props: Partial<SwaggerConfig>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, true),
      auth: props?.auth && new SwaggerAuth(props.auth),
      license: props?.license && new SwaggerLicense(props.license),
      path: props?.path || 'swagger',
    });
  }
}
