import { ApiBody } from '@nestjs/swagger';

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
