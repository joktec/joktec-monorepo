import { isObject } from 'lodash';

export class SlackUtils {
  static parseMessage(msg: string | object): string {
    if (isObject(msg)) {
      return JSON.stringify(msg, null, 2);
    }
    return msg;
  }
}
