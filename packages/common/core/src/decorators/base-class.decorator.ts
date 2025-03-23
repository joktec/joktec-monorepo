import { Inject } from '@nestjs/common';
import { union } from 'lodash';
import { Clazz, InjectType } from '../models';
import { ConfigService, LogService } from '../modules';

export type CallbackClassOptions = {
  className: string;
  classPrototype: any;
  properties: Array<{ name: string; value: any }>;
  methods: Array<{ name: string; descriptor: PropertyDescriptor }>;
};

export const BaseClassDecorator = (
  callback: (options: CallbackClassOptions) => Promise<any> | any,
  injects: Clazz[] = [],
): ClassDecorator => {
  injects = union(injects, [LogService, ConfigService]);
  const injectServices: InjectType[] = injects.map((inject: Clazz) => Inject(inject));

  return (target: Function) => {
    return callback.bind(this)({
      className: target.name,
      classPrototype: target.prototype,
    });
  };
};

const getMethods = (obj: any) =>
  Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function' && item !== 'constructor');

export const BaseClassDecorator2 = (methodDecorator: MethodDecorator, injects: Clazz[] = []): ClassDecorator => {
  injects = union(injects, [LogService, ConfigService]);
  const injectServices: InjectType[] = injects.map((inject: Clazz) => Inject(inject));

  return (target: any) => {
    const methods = getMethods(target.prototype);
    for (const methodName of methods) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
      if (descriptor && descriptor.value instanceof Function) {
        const decoratedDescriptor = methodDecorator(target.prototype, methodName, descriptor);
        // if (decoratedDescriptor) {
        //   Object.defineProperty(target.prototype, methodName, decoratedDescriptor);
        // }
      }
    }
  };
};
