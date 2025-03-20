import { DeepPartial, Entity } from '../models';

export const cloneInstance = <T extends Entity>(origin: DeepPartial<T>, addition: DeepPartial<T> = {}): T => {
  return Object.assign(Object.create(Object.getPrototypeOf(origin)), origin, addition);
};
