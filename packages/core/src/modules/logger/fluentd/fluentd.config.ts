import { toBool, toInt } from '../../../utils';

export class FluentdConfig {
  enable!: boolean;
  host!: string;
  port!: number;
  timeout?: number;
  reconnectInterval?: number;
  flushInterval?: number;

  constructor(props: FluentdConfig) {
    this.host = props.host;
    this.port = toInt(props.port);
    this.enable = toBool(props.enable);
    this.timeout = toInt(props.timeout);
    this.reconnectInterval = toInt(props.reconnectInterval);
    this.flushInterval = toInt(props.flushInterval);
  }
}
