import { toInt } from '../utils';

export enum JwtContext {
  HTTP,
  GQL,
}

export class JwtConfig {
  pending: number;
  limit: number;
  secretKey: string;
  refreshKey: string;
  expired: string;

  constructor(props: Partial<JwtConfig> = {}) {
    Object.assign(this, {
      pending: toInt(props.pending, 30),
      limit: toInt(props.limit, 4),
      secretKey: props.secretKey || '$ecr3t_4ey',
      refreshKey: props.refreshKey || 'r3fre$h_4ey',
      expired: props.expired || '30 days',
    });
  }
}
