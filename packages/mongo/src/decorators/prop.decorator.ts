import {
  ApiHideProperty,
  ApiProperty,
  applyDecorators,
  Clazz,
  Exclude,
  IsNotEmpty,
  IsOptional,
  toArray,
  toBool,
  Type,
  ValidateNested,
} from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { prop, PropType } from '@typegoose/typegoose';
import { BasePropOptions, MapPropOptions, VirtualOptions } from '@typegoose/typegoose/lib/types';
import { isArray, isUndefined, last, omit } from 'lodash';
import {
  ArrayPropOptions,
  ArrayProps,
  DatePropOptions,
  DateProps,
  EnumPropOptions,
  EnumProps,
  NumberPropOptions,
  NumberProps,
  StringPropOptions,
  StringProps,
} from './props';

export type TypegooseProp =
  | BasePropOptions
  | ArrayPropOptions
  | MapPropOptions
  | NumberPropOptions
  | StringPropOptions
  | DatePropOptions
  | EnumPropOptions
  | VirtualOptions;

export type IPropOptions<T = any> = Exclude<TypegooseProp, 'type'> & {
  exclude?: boolean;
  nested?: boolean;
  type?: Clazz | readonly [Clazz];
  example?: T;
  comment?: string;
  strictRef?: boolean;
  i18n?: boolean;
  deprecated?: boolean;
  decorators?: PropertyDecorator[];
  swagger?: ApiPropertyOptions;
};

export const Prop = <T = any>(opts: IPropOptions<T> = {}, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    let designType = Reflect.getMetadata('design:type', target, propertyKey);

    const decorators: PropertyDecorator[] = [...toArray(opts.decorators)];
    const swaggerOptions: ApiPropertyOptions = {
      type: designType,
      required: !!opts.required,
      example: !isUndefined(opts.example) ? opts.example : opts.default,
      enum: opts.enum,
      deprecated: toBool(opts.deprecated, false),
      ...opts.swagger,
    };

    let isArrayType: boolean = false;
    if (opts.type) {
      isArrayType = isArray(opts.type);
      designType = isArrayType ? opts.type[0] : opts.type;

      swaggerOptions.type = designType;
      swaggerOptions.isArray = isArrayType;
      decorators.push(Type(() => designType));
    }

    if (opts.nested) {
      decorators.push(ValidateNested({ each: isArrayType }));
      if (!opts.type) decorators.push(Type(() => designType));
    }

    if (opts.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) validatorOption.message = last(opts.required);
      decorators.push(IsNotEmpty(validatorOption));
    } else {
      decorators.push(IsOptional());
    }

    if (isArrayType) decorators.push(...ArrayProps(opts));
    if (opts.enum) decorators.push(...EnumProps(opts, isArrayType));
    else if (designType === String) decorators.push(...StringProps(opts, isArrayType));
    else if (designType === Number) decorators.push(...NumberProps(opts, isArrayType));
    else if (designType === Date) decorators.push(...DateProps(opts, isArrayType));
    else {
      // TODO:
    }

    if (opts.exclude) {
      decorators.push(Exclude({ toPlainOnly: true }));
      decorators.push(ApiHideProperty());
    }

    const mongooseOpts = omit(opts, ['type']);
    applyDecorators(prop(mongooseOpts, kind), ...decorators, ApiProperty(swaggerOptions))(target, propertyKey);
  };
};
