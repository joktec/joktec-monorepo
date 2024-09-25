import { IsBoolean, IsInt, IsObject, IsOptional, IsString, validateSync, ValidationError } from 'class-validator';
import { RetryOptions } from '../decorators';
import { IValidationProperty } from '../exceptions';
import { buildError, toBool, toInt } from '../utils';

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

  @IsInt()
  @IsOptional()
  initTimeout?: number;

  @IsOptional()
  @IsObject()
  retry?: RetryOptions;

  @IsOptional()
  @IsBoolean()
  debug?: boolean;

  constructor(props: ClientConfig) {
    Object.assign(this, {
      ...props,
      conId: props?.conId ?? DEFAULT_CON_ID,
      inherit: toBool(props.inherit, true),
      initTimeout: toInt(props.initTimeout, 3000),
      debug: toBool(props.debug, false),
    });
  }

  validate(): IValidationProperty[] {
    const errors: ValidationError[] = validateSync(this);
    if (!errors.length) return [];
    return buildError(errors);
  }
}
