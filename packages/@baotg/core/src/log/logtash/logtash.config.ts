import { toBool, toInt } from '../../utils';

export class LogStashConfig {
  host: string;
  port: number;
  enable: boolean;

  constructor(props: LogStashConfig) {
    this.host = props.host;
    this.port = toInt(props.port);
    this.enable = toBool(props.enable);
  }
}
