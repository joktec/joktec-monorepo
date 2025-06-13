import { ApiHideProperty, ApiProperty, ApiPropertyOptions, applyDecorators, Clazz } from '@joktec/core';
import { Exclude, Expose, IsMongoId, IsNotEmpty, IsOptional, toArray, Type, ValidateNested } from '@joktec/utils';
import { prop, PropType, Severity } from '@typegoose/typegoose';
import { BasePropOptions, MapPropOptions, VirtualOptions } from '@typegoose/typegoose/lib/types';
import { isArray, isBoolean, isNil, isUndefined, last, merge, unset } from 'lodash';
import { ObjectId } from '../models';
import { PROP_DESIGN_TYPE_KEY } from '../mongo.constant';
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
  hidden?: boolean;
  nested?: boolean;
  example?: T | Clazz<T>;
  comment?: string;
  strictRef?: boolean;
  deprecated?: boolean;
  groups?: string[];
  decorators?: PropertyDecorator[];
  swagger?: ApiPropertyOptions;
  useGQL?: boolean;
};

const isRequired = (opts: IPropOptions<any> = {}): boolean => {
  const required = opts.required;
  if (!required) return false;
  if (isBoolean(required)) return required;
  if (isArray(required)) return required[0];
  return false;
};

const isObjectIdType = (designType: any): boolean => {
  return designType === ObjectId || designType === ObjectId.prototype.constructor;
};

export const Prop = <T = any>(opts: IPropOptions<T> = {}, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    let designType = Reflect.getMetadata('design:type', target, propertyKey);

    ['unique', 'index', 'text'].map(key => unset(opts, key));

    const decorators: PropertyDecorator[] = [...toArray(opts.decorators)];
    const swaggerOptions: ApiPropertyOptions = {
      type: isObjectIdType(designType) ? String : designType,
      required: isRequired(opts),
      example: !isUndefined(opts.example) ? opts.example : opts.default,
      enum: opts.enum,
      deprecated: isBoolean(opts.deprecated) ? opts.deprecated : undefined,
      nullable: !opts.required,
      description: opts?.comment || undefined,
    };

    let isArrayType: boolean = false;
    if (opts.type) {
      const typeFunction = isArray(opts.type) ? opts.type[0] : opts.type;
      if (isObjectIdType(typeFunction)) decorators.push(Type(() => String));
      else decorators.push(Type(() => typeFunction));

      isArrayType = isArray(opts.type) || kind === PropType.ARRAY;
      designType = isArray(opts.type) ? opts.type[0] : opts.type;
      swaggerOptions.type = isObjectIdType(typeFunction) ? String : typeFunction;
      swaggerOptions.isArray = isArrayType;

      if (isObjectIdType(typeFunction)) {
        if (isArrayType) opts.example = ['00000020f51bb4362eee2a4d'] as any;
        else opts.example = '00000020f51bb4362eee2a4d' as any;
      }
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
    } else if (opts.groups?.length) {
      decorators.push(Expose({ groups: opts.groups }));
    } else {
      decorators.push(Expose());
    }

    if (opts.nested) {
      decorators.push(ValidateNested({ each: isArrayType }));
      if (!opts.type) decorators.push(Type(() => designType));
    }

    if (opts.immutable) {
      // swaggerOptions.readOnly = true;
      if (isBoolean(opts.immutable) && swaggerOptions.nullable) {
        opts.immutable = (v: any) => !isNil(v);
      }
    }

    if (kind === PropType.MAP) opts.allowMixed = Severity.ALLOW;

    if (isArrayType) decorators.push(...ArrayProps(opts, swaggerOptions));
    if (opts.enum) {
      decorators.push(...EnumProps(opts, swaggerOptions));
      if (!isRequired(opts)) opts.addNullToEnum = true;
    } else if (designType === String) decorators.push(...StringProps(opts, swaggerOptions));
    else if (designType === Number) decorators.push(...NumberProps(opts, swaggerOptions));
    else if (designType === Date) decorators.push(...DateProps(opts, swaggerOptions));
    else if (designType === Boolean) decorators.push(...BoolProps(opts, swaggerOptions));
    else if (isObjectIdType(designType)) decorators.push(IsMongoId({ each: swaggerOptions.isArray }));

    const mongooseOpts = { ...opts };
    if (mongooseOpts.ref) {
      delete mongooseOpts.type;
      if (opts.example) swaggerOptions.example = opts.example;
      else swaggerOptions.example = isArrayType ? [] : {};
    } else {
      if (!isArrayType && isArray(opts.example)) {
        swaggerOptions.example = opts.example[0];
        swaggerOptions.examples = opts.example;
      }
    }

    applyDecorators(
      prop(mongooseOpts, kind),
      ...decorators,
      ApiProperty(merge(swaggerOptions, opts.swagger)),
    )(target, propertyKey);
    Reflect.defineMetadata(PROP_DESIGN_TYPE_KEY, designType, target, propertyKey);
  };
};
