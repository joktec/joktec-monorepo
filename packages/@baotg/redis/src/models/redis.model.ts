export interface RedisModel<T> {
  conId?: string;
  namespace?: string;
  value: T;
}
