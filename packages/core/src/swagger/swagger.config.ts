import { SwaggerUiOptions } from 'swagger-ui-express';

export class SwaggerLicense {
  name!: string;
  url!: string;

  constructor(props: Partial<SwaggerLicense>) {
    Object.assign(this, {
      name: props?.name || 'MIT',
      url: props?.url || 'https://opensource.org/licenses/MIT',
    });
  }
}

export class SwaggerAuth {
  username!: string;
  password!: string;

  constructor(props: Partial<SwaggerAuth>) {
    Object.assign(this, props);
  }
}

export class SwaggerConfig {
  title?: string;
  description?: string;
  version?: string;
  server?: string;
  path!: string;
  options?: SwaggerUiOptions;
  auth?: SwaggerAuth;
  license?: SwaggerLicense;

  constructor(props: Partial<SwaggerConfig>) {
    Object.assign(this, {
      ...props,
      auth: props?.auth && new SwaggerAuth(props.auth),
      license: props?.license && new SwaggerLicense(props.license),
      path: props?.path || 'swagger',
    });
  }
}
