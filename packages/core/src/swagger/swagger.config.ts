import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SwaggerUiOptions } from 'swagger-ui-express';
import { IsTypes } from '../validation';

export class SwaggerLicense {
  @IsString()
  @IsNotEmpty()
  name?: string = 'MIT';

  @IsString()
  @IsNotEmpty()
  url: string = 'https://opensource.org/licenses/MIT';

  constructor(props: Partial<SwaggerLicense>) {
    Object.assign(this, props);
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
  @IsOptional()
  enable?: boolean = true;

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
  @IsOptional()
  path?: string = 'swagger';

  @IsOptional()
  options?: SwaggerUiOptions;

  @IsTypes([SwaggerAuth])
  @IsOptional()
  auth?: SwaggerAuth;

  @IsTypes([SwaggerLicense])
  @IsOptional()
  license?: SwaggerLicense;

  constructor(props: Partial<SwaggerConfig>) {
    Object.assign(this, props);
    if (props?.auth) this.auth = new SwaggerAuth(props.auth);
    if (props?.license) this.license = new SwaggerLicense(props.license);
  }
}
