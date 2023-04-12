export enum JwtContext {
  HTTP,
  GQL,
}

export class JwtConfig {
  secretKey: string;
  refreshKey: string;
  expired: string;

  constructor(props: Partial<JwtConfig> = {}) {
    Object.assign(this, {
      secretKey: props.secretKey || '$ecr3t_4ey',
      refreshKey: props.refreshKey || 'r3fre$h_4ey',
      expired: props.expired || '30 days',
    });
  }
}
