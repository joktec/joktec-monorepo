import {
  ApiProperty,
  applyDecorators,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  toArray,
} from '@joktec/core';
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
import { isArray, last } from 'lodash';

export type TypegooseProp =
  | BasePropOptions
  | ArrayPropOptions
  | MapPropOptions
  | PropOptionsForNumber
  | PropOptionsForString
  | VirtualOptions;

export type IPropOptions = TypegooseProp & {
  example?: any;
  strictRef?: boolean;
  i18n?: boolean;
  kind?: PropType;
  decorators?: PropertyDecorator[];
  swagger?: ApiPropertyOptions;
};

export const Prop = (opts?: IPropOptions): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const type = opts?.type || Reflect.getMetadata('design:type', target, propertyKey);
    const isArrayType = opts?.kind === PropType.ARRAY;

    const decorators: PropertyDecorator[] = [...toArray(opts?.decorators)];
    const swaggerOptions: ApiPropertyOptions = {
      type,
      required: !!opts?.required,
      example: opts?.default || opts?.example,
      enum: opts?.enum,
      isArray: isArrayType,
      ...opts?.swagger,
    };

    if (opts?.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) validatorOption.message = last(opts.required);
      decorators.push(IsNotEmpty(validatorOption));
    } else {
      decorators.push(IsOptional());
    }

    if (type === String) decorators.push(IsString({ each: isArrayType }));
    if (type === Number) decorators.push(IsNumber({}, { each: isArrayType }));
    if (opts?.enum) decorators.push(IsEnum(CategoryType, { each: isArrayType }));

    applyDecorators(prop(opts, opts?.kind), ...decorators, ApiProperty(swaggerOptions))(target, propertyKey);
  };
};
