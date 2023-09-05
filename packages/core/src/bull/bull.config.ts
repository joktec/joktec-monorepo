import { toArray, toInt } from '../utils';

export class BullBoardConfig {
  path!: string;
  username?: string;
  password?: string;

  constructor(props: Partial<BullBoardConfig>) {
    Object.assign(this, {
      ...props,
      path: props?.path || 'bulls',
    });
  }
}

export class BullConfig {
  queue: string[];
  host?: string;
  port?: number;
  password?: string;
  bullBoard?: BullBoardConfig;

  constructor(props: BullConfig) {
    Object.assign(this, {
      ...props,
      queue: toArray<string>(props?.queue, { split: ',' }),
      host: props?.host || 'localhost',
      port: toInt(props?.port, 6379),
      bullBoard: props?.bullBoard && new BullBoardConfig(props.bullBoard),
    });
  }
}
