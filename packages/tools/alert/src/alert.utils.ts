import { isObject, isString } from 'lodash';
import { AlertTitle } from './models';

export class AlertUtils {
  static parseMessage(msg: string | object): string {
    if (isObject(msg)) {
      return JSON.stringify(msg, null, 2);
    }
    return msg;
  }
}

export const buildTitle = (title: string | AlertTitle): string => {
  if (isString(title)) return title;
  return `${title.icon} *[${title.code}] - ${title.title} *`;
};

export const parseMessage = (msg: string | object): string => {
  if (isObject(msg)) {
    return JSON.stringify(msg, null, 2);
  }
  return msg;
};
