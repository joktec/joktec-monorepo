import { ApiBearerAuth, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { isBoolean } from 'lodash';
import { MethodNotAllowedException } from '../../exceptions';
import { Constructor, HttpRequestHeader, Wrapper } from '../../models';

export const ApiFile = (fileName: string = 'file'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: { type: 'string', format: 'binary' },
        },
      },
    })(target, propertyKey, descriptor);
  };
};

export const ApiFiles = (fileName: string = 'files'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: { type: 'array', items: { type: 'string', format: 'binary' } },
        },
      },
    })(target, propertyKey, descriptor);
  };
};

type DecoratorOptions = { name: string };
type ApiSchemaDecorator = <T extends Constructor<object>>(options: DecoratorOptions) => (constructor: T) => Wrapper<T>;
export const ApiSchema: ApiSchemaDecorator = ({ name }) => {
  return constructor => {
    const wrapper = class extends constructor {};
    Object.defineProperty(wrapper, 'name', { value: name, writable: false });
    return wrapper;
  };
};

export function ApiDisableEndpoint(disable: boolean = false): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (disable) throw new MethodNotAllowedException();
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

export function ApiUseBearer(active: boolean = false): MethodDecorator & ClassDecorator {
  return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any => {
    if (descriptor) {
      active && ApiBearerAuth()(target, propertyKey, descriptor);
      return descriptor;
    }
    active && ApiBearerAuth()(target);
    return target;
  };
}

export function ApiUseApiKey(active: boolean | [boolean, string] = false): MethodDecorator & ClassDecorator {
  const isActive: boolean = isBoolean(active) ? active : active[0];
  const headerName: string = isBoolean(active) ? HttpRequestHeader.X_API_KEY : active[1];
  return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any => {
    if (descriptor) {
      isActive && ApiSecurity(headerName)(target, propertyKey, descriptor);
      return descriptor;
    }
    isActive && ApiSecurity(headerName)(target);
    return target;
  };
}
