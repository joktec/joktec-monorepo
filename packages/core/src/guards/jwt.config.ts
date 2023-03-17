export enum JwtContext {
  HTTP,
  GQL,
}

export interface JwtConfig {
  [key: string]: any;

  pending: number;
  limit: number;
  secretKey: string;
  expired: string;
}
