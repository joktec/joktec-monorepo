import { toBool } from '../../utils';

export class GoogleLogConfig {
  enable!: boolean;
  projectId!: string;
  credentials?: string;

  constructor(props: GoogleLogConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props.enable, false),
    });
  }
}
