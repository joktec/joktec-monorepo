import { IsNotEmpty, IsNumber, JwtConfig } from '@joktec/core';

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
