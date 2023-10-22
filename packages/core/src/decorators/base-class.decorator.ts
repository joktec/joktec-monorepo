import { Inject } from '@nestjs/common';
import { union } from 'lodash';
import { ConfigService } from '../config';
import { LogService } from '../logger';
import { Clazz, InjectType } from '../models';

const getMethods = (obj: any) =>
  Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function' && item !== 'constructor');

export const BaseClassDecorator = (methodDecorator: MethodDecorator, injects: Clazz[] = []): ClassDecorator => {
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
