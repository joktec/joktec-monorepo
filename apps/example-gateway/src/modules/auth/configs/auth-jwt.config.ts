import { JwtConfig } from '@joktec/core';
import { IsNotEmpty, IsNumber } from '@joktec/utils';

export class AuthJwtConfig extends JwtConfig {
  @IsNumber()
  @IsNotEmpty()
  pending?: number = 30;

  @IsNumber()
  @IsNotEmpty()
  limit?: number = 4;

  constructor(props?: Partial<AuthJwtConfig>) {
    super(props);
    Object.assign(this, props);
  }
}
