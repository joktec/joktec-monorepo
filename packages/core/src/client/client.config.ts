import { RetryOptions } from '../retry';
import { toBool, toInt } from '../utils';
import {
  buildError,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from '../validation';

export const DEFAULT_CON_ID: string = 'default';

export class ClientConfig {
  @IsString()
  @IsOptional()
  conId?: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsBoolean()
  @IsOptional()
  inherit?: boolean;

  @IsNumber()
  @IsOptional()
  initTimeout?: number;

  @IsOptional()
  @IsObject()
  retry?: RetryOptions;

  constructor(props: ClientConfig) {
    Object.assign(this, {
      ...props,
      conId: props?.conId ?? DEFAULT_CON_ID,
      inherit: toBool(props.inherit, true),
      initTimeout: toInt(props.initTimeout, 3000),
    });
  }

  validate(): string[] {
    const errors: ValidationError[] = validateSync(this);
    if (!errors.length) return null;
    const formatError = buildError(errors);
    return Object.values(formatError).flat();
  }
}
