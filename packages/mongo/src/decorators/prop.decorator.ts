import {
  ApiHideProperty,
  ApiProperty,
  applyDecorators,
  Clazz,
  Exclude,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  toArray,
  Type,
  ValidateNested,
} from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { prop, PropType } from '@typegoose/typegoose';
import { ArrayPropOptions, BasePropOptions, MapPropOptions, VirtualOptions } from '@typegoose/typegoose/lib/types';
import { isArray, last, omit } from 'lodash';
import { NumberPropOptions, NumberProps, StringPropOptions, StringProps } from './props';

export type TypegooseProp =
  | BasePropOptions
  | ArrayPropOptions
  | MapPropOptions
  | NumberPropOptions
  | StringPropOptions
  | VirtualOptions;

export type IPropOptions<T = any> = Exclude<TypegooseProp, 'type'> & {
  exclude?: boolean;
  type?: Clazz | readonly [Clazz];
  example?: T;
  comment?: string;
  strictRef?: boolean;
  i18n?: boolean;
  decorators?: PropertyDecorator[];
  swagger?: ApiPropertyOptions;
};

export const Prop = <T = any>(opts: IPropOptions<T> = {}, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const designType = Reflect.getMetadata('design:type', target, propertyKey);

    const decorators: PropertyDecorator[] = [...toArray(opts.decorators)];
    const swaggerOptions: ApiPropertyOptions = {
      type: designType,
      required: !!opts.required,
      example: opts.example || opts.default || undefined,
      enum: opts.enum,
      ...opts.swagger,
    };

    let isArrayType: boolean = false;
    if (opts.type) {
      isArrayType = isArray(opts.type);
      const type = isArrayType ? opts.type[0] : opts.type;

      swaggerOptions.type = type;
      swaggerOptions.isArray = isArrayType;
      decorators.push(Type(() => type));
      if (isArrayType) decorators.push(IsArray());
    }

    if (opts.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) validatorOption.message = last(opts.required);
      decorators.push(IsNotEmpty(validatorOption));
    } else {
      decorators.push(IsOptional());
    }

    if (opts.enum) decorators.push(IsEnum(opts.enum, { each: isArrayType }));
    if (designType === String) {
      decorators.push(...StringProps(opts, isArrayType));
    } else if (designType === Number) {
      decorators.push(...NumberProps(opts, isArrayType));
    } else if (designType === Date) {
      decorators.push(Type(() => Date));
      decorators.push(IsDate({ each: isArrayType }));
    } else {
      decorators.push(ValidateNested({ each: isArrayType }));
    }

    if (opts.exclude) {
      decorators.push(Exclude({ toPlainOnly: true }));
      decorators.push(ApiHideProperty());
    }

    const mongooseOpts = omit(opts, ['type']);
    applyDecorators(prop(mongooseOpts, kind), ...decorators, ApiProperty(swaggerOptions))(target, propertyKey);
  };
};
