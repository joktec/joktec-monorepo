import { IsBoolean, IsNumber, IsOptional, IsString, validateSync, ValidationError } from '../validation';
import { toBool, toInt } from '../utils';

export const DEFAULT_CON_ID = 'default';

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

  constructor(props: ClientConfig) {
    Object.assign(this, {
      conId: props?.conId ?? DEFAULT_CON_ID,
      context: props?.context,
      inherit: toBool(props.inherit, true),
      initTimeout: toInt(props.initTimeout, 3000),
    });
  }

  validate(): string[] {
    const errors: ValidationError[] = validateSync(this);
    return errors.length ? errors.reduce((res, err) => res.concat(Object.values(err.constraints)), []) : null;
  }
}
