import { IData, IResult } from 'ua-parser-js';

export interface IUserAgentData<T> extends IData<T> {
  is(val: string): boolean;

  toString(): string;

  withClientHints(): PromiseLike<T> | T;

  withFeatureCheck(): PromiseLike<T> | T;
}

export interface IUserAgent extends IResult {}
