import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export class SwaggerConfig {
  description?: string;
  version?: string;
  servers?: string[];
  path: string;
  options?: SwaggerUiOptions;

  constructor(props: Partial<SwaggerConfig>) {
    Object.assign(this, props);
  }
}
