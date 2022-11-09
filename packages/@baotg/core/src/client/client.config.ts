import { IsString, IsOptional, validateSync, ValidationError } from 'class-validator';

export const DEFAULT_CON_ID = 'default';

export class ClientConfig {
  @IsString()
  @IsOptional()
  conId?: string;

  @IsString()
  @IsOptional()
  context: string;

  constructor(props: ClientConfig) {
    this.conId = props?.conId ?? DEFAULT_CON_ID;
    this.context = props?.context;
  }

  validate(): string[] {
    const errors: ValidationError[] = validateSync(this);
    return errors.length ? errors.reduce((res, err) => res.concat(Object.values(err.constraints)), []) : null;
  }
}
