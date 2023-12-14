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
import { isArray } from 'lodash';

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
  decorator?: PropertyDecorator[];
  apiProperty?: ApiPropertyOptions;
};

export const Prop = (opts?: IPropOptions): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const type = opts?.type || Reflect.getMetadata('design:type', target, propertyKey);
    const isArrayType = opts?.kind === PropType.ARRAY;

    const decorators: PropertyDecorator[] = [];
    const apiPropertyOptions: ApiPropertyOptions = {
      type,
      required: !!opts?.required,
      example: opts?.default || opts?.example,
      enum: opts?.enum,
      isArray: isArrayType,
      ...opts?.apiProperty,
    };

    if (opts?.required) {
      const validatorOption: any = {};
      if (isArray(opts.required)) {
        const [_, message] = opts.required;
        validatorOption.message = message;
      }
      decorators.push(IsNotEmpty(validatorOption));
    } else {
      decorators.push(IsOptional());
    }

    if (type === String) decorators.push(IsString({ each: isArrayType }));
    if (type === Number) decorators.push(IsNumber({}, { each: isArrayType }));
    // if (type === Object) {
    // }
    if (opts?.enum) decorators.push(IsEnum(CategoryType, { each: isArrayType }));

    applyDecorators(
      prop(opts, opts?.kind),
      ...decorators,
      ...toArray(opts?.decorator),
      ApiProperty(apiPropertyOptions),
    )(target, propertyKey);
  };
};
