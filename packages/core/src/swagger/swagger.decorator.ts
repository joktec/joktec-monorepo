import { ApiBody } from '@nestjs/swagger';
import { Constructor, Wrapper } from '../models';

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
