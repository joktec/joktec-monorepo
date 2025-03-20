import { IsNotEmpty, IsOptional, IsString } from '@joktec/utils';

export enum JwtContext {
  HTTP,
  GQL,
}

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  secretKey!: string;

  @IsString()
  @IsOptional()
  refreshKey?: string;

  @IsString()
  @IsNotEmpty()
  expired: string;

  constructor(props: Partial<JwtConfig>) {
    Object.assign(this, props);
  }
}
