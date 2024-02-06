import { isString } from 'lodash';

export type IExceptionMessage = string | { message: string; title?: string; code?: number };

export class Exception<T = any> extends Error {
  title?: string;
  code?: number;
  status: number;
  data: T;

  constructor(_message: IExceptionMessage, status: number, data: T) {
    const message = isString(_message) ? _message : _message.message;
    super(message);
    this.status = status;
    this.data = data;
    this.title = isString(_message) ? undefined : _message?.title;
    this.code = isString(_message) ? undefined : _message?.code;
  }

  public getError = () => ({
    status: this.status,
    message: this.message,
    data: this.data,
    title: this.title,
    code: this.code,
  });
}
