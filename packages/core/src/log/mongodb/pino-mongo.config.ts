import { toBool } from '../../utils';
import { FormatFunction } from '@burakbey/pino-mongodb';

export class PinoMongoConfig {
  enable!: boolean;
  uri: string;
  database: string;
  collection: string;
  format?: FormatFunction;

  constructor(props: PinoMongoConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, false),
    });
  }
}
