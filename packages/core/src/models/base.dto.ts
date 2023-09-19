export type Constructor<T> = new (...args: any[]) => T;
export type Clazz = Constructor<any>;
export type Wrapper<T = object> = { new (): T & any; prototype: T };
export type Dictionary<T = any> = { [key: string]: T };
export type Entity<T = any> = object | Record<string, any> | Dictionary<T> | Constructor<T>;

export interface IResponseDto<T = any> {
  timestamp: Date;
  success: boolean;
  errorCode?: number;
  message?: string;
  data?: T;

  validate?: Array<{ path: string; messages: string[] }>;
  error?: any;
  path?: string;
  method?: string;
  body?: any;
  params?: any;
  query?: any;
}
