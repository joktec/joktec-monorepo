import { toBool } from '../../utils';

export class LogtailConfig {
  enable: boolean;
  token: string;

  constructor(props: LogtailConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, false),
    });
  }
}
