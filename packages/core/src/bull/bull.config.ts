import { toArray, toInt } from '../utils';

export class BullConfig {
  queue: string[];
  host?: string;
  port?: number;
  password?: string;

  constructor(props: BullConfig) {
    Object.assign(this, {
      ...props,
      queue: toArray<string>(props.queue, { split: ',' }),
      host: props?.host || 'localhost',
      port: toInt(props?.port, 6379),
    });
  }
}
