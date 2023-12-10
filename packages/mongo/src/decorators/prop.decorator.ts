import { ApiProperty, applyDecorators, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from '@joktec/core';
import { CategoryType } from '@joktec/gateway/dist/modules/categories/models/category.enum';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { prop, PropType } from '@typegoose/typegoose';
import {
  ArrayPropOptions,
  BasePropOptions,
  MapPropOptions,
  PropOptionsForNumber,
  PropOptionsForString,
  VirtualOptions,
} from '@typegoose/typegoose/lib/types';
import { isArray } from 'lodash';

export type TypegooseProp =
  | BasePropOptions
  | ArrayPropOptions
  | MapPropOptions
  | PropOptionsForNumber
  | PropOptionsForString
  | VirtualOptions;

export type IPropOptions = TypegooseProp & { example?: any; strictRef?: boolean; i18n?: boolean };

export const Prop = (opts?: IPropOptions, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    applyDecorators(prop(opts, kind))(target, propertyKey);
  };
};

// TODO
export const TempProp = (opts?: IPropOptions, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const type = opts?.type || Reflect.getMetadata('design:type', target, propertyKey);
    const isArrayType = kind === PropType.ARRAY;

    const decorators: PropertyDecorator[] = [];
    const apiPropertyOptions: ApiPropertyOptions = {
      type,
      example: opts?.example,
    };

    if (opts?.type) {
      apiPropertyOptions.type = opts?.type;
    }

    if (opts?.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) {
        const [_, message] = opts.required;
        validatorOption.message = message;
      }
      decorators.push(IsNotEmpty(validatorOption));
      apiPropertyOptions.required = true;
    } else {
      decorators.push(IsOptional());
      apiPropertyOptions.required = false;
    }

    if (type === String) {
      decorators.push(IsString({ each: isArrayType }));
    }

    if (type === Number) {
      decorators.push(IsNumber({}, { each: isArrayType }));
    }

    if (opts?.enum) {
      decorators.push(IsEnum(CategoryType, { each: isArrayType }));
      apiPropertyOptions.enum = opts.enum;
    }

    applyDecorators(prop(opts, kind), ...decorators, ApiProperty(apiPropertyOptions))(target, propertyKey);
  };
};
