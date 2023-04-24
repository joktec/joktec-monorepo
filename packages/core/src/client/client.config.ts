import { IsBoolean, IsOptional, IsString, validateSync, ValidationError } from '../validation';
import { toBool } from '../utils';

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

  constructor(props: ClientConfig) {
    Object.assign(this, {
      conId: props?.conId ?? DEFAULT_CON_ID,
      context: props?.context,
      inherit: toBool(props.inherit, true),
    });
  }

  validate(): string[] {
    const errors: ValidationError[] = validateSync(this);
    return errors.length ? errors.reduce((res, err) => res.concat(Object.values(err.constraints)), []) : null;
  }
}
