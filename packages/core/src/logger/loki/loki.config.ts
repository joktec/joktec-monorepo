import { toBool } from '../../utils';

export class LokiConfig {
  host!: string;
  username!: string;
  password!: string;
  enable!: boolean;

  constructor(props: LokiConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props.enable, false),
    });
  }
}
