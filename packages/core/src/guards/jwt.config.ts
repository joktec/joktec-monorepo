import { IsNotEmpty, IsString } from 'class-validator';

export enum JwtContext {
  HTTP,
  GQL,
}

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  secretKey!: string;

  @IsString()
  @IsNotEmpty()
  refreshKey: string;

  @IsString()
  @IsNotEmpty()
  expired: string;

  constructor(props: Partial<JwtConfig>) {
    Object.assign(this, props);
  }
}
