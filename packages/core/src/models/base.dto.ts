export type IZeroType = null | undefined;
export type IPrimaryType = string | number | bigint | boolean;
export type Func = (...args: any) => any;
export type IDateType = Date;
export type IEnum = { readonly [path: string | number]: Readonly<string | number | null> };

export type Constructor<T> = new (...args: any[]) => T;
export type Clazz = Constructor<any>;
export type InjectType = (target: object, key: string | symbol, index?: number) => void;
export type Wrapper<T = object> = { new (): T & any; prototype: T };
export type Dictionary<T = any> = { [key: string]: T };
export type Entity<T = any> = object | Record<string, any> | Dictionary<T> | Constructor<T>;
export type DeepPartial<T extends Entity> = {
  [P in keyof T]?: T[P] extends Entity ? DeepPartial<T[P]> : T[P];
};
export type KeyOf<T extends Entity = {}> = Extract<keyof T, string>;

export interface IResponseDto<T = any> {
  timestamp: Date;
  success: boolean;
  errorCode?: number;
  message?: string;
  data?: T;

  error?: any;
  path?: string;
  method?: string;
  body?: any;
  params?: any;
  query?: any;
}
