import { FormatFunction } from '@burakbey/pino-mongodb';
import { toBool } from '../../../utils';

export class PinoMongoConfig {
  enable!: boolean;
  uri!: string;
  database!: string;
  collection?: string;
  format?: FormatFunction;

  constructor(props: PinoMongoConfig) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, false),
    });
  }
}
