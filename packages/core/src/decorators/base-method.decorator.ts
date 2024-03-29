import { Inject } from '@nestjs/common';
import { camelCase, fromPairs, map, union } from 'lodash';
import { Clazz, InjectType } from '../models';
import { ConfigService, LogService } from '../modules';

export type ServicesInject = {
  configService: ConfigService;
  pinoLogger: LogService;
  [serviceName: string]: any;
};

export type CallbackMethodOptions = {
  params: any;
  args: any[];
  method: (...args: any[]) => Promise<any> | any;
  services: ServicesInject;
  target: Object;
  propertyKey: string | symbol;
  descriptor: PropertyDescriptor;
};

export const BaseMethodDecorator = (
  callback: (options: CallbackMethodOptions) => Promise<any> | any,
  injects: Clazz[] = [],
): MethodDecorator => {
  injects = union(injects, [LogService, ConfigService]);
  const injectServices: InjectType[] = injects.map((inject: Clazz) => Inject(inject));

  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originMethod = descriptor.value;
    injectServices.forEach((injectService, index) => injectService(target, injects[index].name));

    descriptor.value = function (...args: any[]) {
      this.PinoLogger.setContext(Reflect.get(target, 'constructor').name);

      const argNames = computeOriginalArguments(originMethod);
      const params: any = argNames.reduce((obj: any, key: string, idx: number) => {
        obj[key] = args[idx];
        return obj;
      }, {});

      return callback.bind(this)({
        params,
        args,
        target,
        propertyKey,
        descriptor,
        method: originMethod.bind(this), // bind `this` helps us have context when `callback` is an arrow functions.
        services: fromPairs(map(injects, (i: Clazz) => [camelCase(i.name), this[i.name]])),
      });
    };

    return descriptor;
  };
};

function computeOriginalArguments(originalFunc: Function): string[] {
  const stringify: string = originalFunc.toString();

  const startBracket = stringify.indexOf('(');
  if (startBracket < 0) return [];

  const endBracket = stringify.indexOf(')', startBracket);
  if (endBracket < 0) return [];

  const paramsString = stringify.substring(startBracket + 1, endBracket);
  return !paramsString.length ? [] : paramsString.split(',').map(e => e.trim());
}
