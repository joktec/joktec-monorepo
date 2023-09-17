import { toBool, toInt } from '../../utils';

export class CloudWatchConfig {
  host: string;
  port: number;
  enable: boolean;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;

  constructor(props: CloudWatchConfig) {
    this.host = props.host;
    this.port = toInt(props.port);
    this.enable = toBool(props.enable);
    this.accessKeyId = props.accessKeyId;
    this.secretAccessKey = props.secretAccessKey;
    this.region = props.region;
  }
}
