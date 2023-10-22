import { Clazz } from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ValidationOptions } from 'class-validator';
import { ISchemaOptions } from './scheme.decorator';

interface IPropOptions {
  required?: boolean;
  trim?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  readonly?: boolean;
  example?: any;
  default?: any;
  enum?: any[] | Record<string, any>;
  type?: Clazz;
  validator?: PropertyDecorator[];
  validationOptions?: ValidationOptions;
}

export const Prop = (opts?: IPropOptions): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const constructor = Reflect.getPrototypeOf(target).constructor;
    const schemaOptions: ISchemaOptions = Reflect.getMetadata(constructor.name, target.constructor);

    const swagger: ApiPropertyOptions = {};
    // const graph: FieldOptionsExtractor<T> = {};
    // Now you can access schemaOptions in the Prop decorator
    console.log('Schema Options:', schemaOptions);

    // opts?.validator(target, propertyKey)
    // You can also access the property key (name) within this decorator
    console.log('Property Key:', propertyKey);
  };
};
