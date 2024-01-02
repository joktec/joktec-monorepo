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
import { prop, PropType, Severity } from '@typegoose/typegoose';
import { BasePropOptions, DeferredFunc, MapPropOptions, VirtualOptions } from '@typegoose/typegoose/lib/types';
import { isArray, isBoolean, isFunction, isNil, isUndefined, last, omit, unset } from 'lodash';
import {
  ArrayPropOptions,
  ArrayProps,
  BoolPropOptions,
  BoolProps,
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
  | StringPropOptions
  | NumberPropOptions
  | DatePropOptions
  | EnumPropOptions
  | BoolPropOptions
  | ArrayPropOptions
  | MapPropOptions
  | VirtualOptions;

export type IPropOptions<T = any> = TypegooseProp & {
  type?: Clazz | readonly [Clazz] | DeferredFunc<Clazz> | DeferredFunc<unknown> | unknown;
  hidden?: boolean;
  nested?: boolean;
  example?: T;
  comment?: string;
  strictRef?: boolean;
  deprecated?: boolean;
  groups?: string[];
  decorators?: PropertyDecorator[];
  swagger?: ApiPropertyOptions;
  useGQL?: boolean;
};

export const Prop = <T = any>(opts: IPropOptions<T> = {}, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    let designType = Reflect.getMetadata('design:type', target, propertyKey);

    ['unique', 'index', 'text'].map(key => unset(opts, key));

    const decorators: PropertyDecorator[] = [...toArray(opts.decorators)];
    const swaggerOptions: ApiPropertyOptions = {
      type: designType,
      required: !!opts.required,
      example: !isUndefined(opts.example) ? opts.example : opts.default,
      enum: opts.enum,
      deprecated: toBool(opts.deprecated, false),
      nullable: !opts.required,
      description: opts?.comment || undefined,
      ...opts.swagger,
    };

    let isArrayType: boolean = false;
    if (opts.type) {
      const typeFunction = isFunction(opts.type) ? opts.type : isArray(opts.type) ? opts.type[0] : opts.type;
      decorators.push(Type(typeFunction));

      isArrayType = isArray(opts.type) || kind === PropType.ARRAY;
      designType = isArrayType ? opts.type[0] : opts.type;
      if (isArrayType && kind !== PropType.ARRAY) kind = PropType.ARRAY;

      swaggerOptions.type = typeFunction;
      swaggerOptions.isArray = isArrayType;
    }

    if (opts.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) validatorOption.message = last(opts.required);
      decorators.push(IsNotEmpty(validatorOption));
    } else {
      decorators.push(IsOptional());
    }

    if (opts.hidden) {
      decorators.push(Exclude({ toPlainOnly: true }));
      decorators.push(ApiHideProperty());
    }

    if (opts.nested) {
      decorators.push(ValidateNested({ each: isArrayType }));
      if (!opts.type) decorators.push(Type(() => designType));
    }

    if (opts.immutable) {
      swaggerOptions.readOnly = true;
      if (isBoolean(opts.immutable) && swaggerOptions.nullable) {
        opts.immutable = (v: any) => !isNil(v);
      }
    }

    if (kind === PropType.MAP) opts.allowMixed = Severity.ALLOW;

    if (isArrayType) decorators.push(...ArrayProps(opts, swaggerOptions));
    if (opts.enum) decorators.push(...EnumProps(opts, swaggerOptions));
    else if (designType === String) decorators.push(...StringProps(opts, swaggerOptions));
    else if (designType === Number) decorators.push(...NumberProps(opts, swaggerOptions));
    else if (designType === Date) decorators.push(...DateProps(opts, swaggerOptions));
    else if (designType === Boolean) decorators.push(...BoolProps(opts, swaggerOptions));

    const mongooseOpts = omit(opts, ['type']);
    applyDecorators(prop(mongooseOpts, kind), ...decorators, ApiProperty(swaggerOptions))(target, propertyKey);
  };
};
