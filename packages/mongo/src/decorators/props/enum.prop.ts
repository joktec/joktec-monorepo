import { ApiPropertyOptions } from '@joktec/core';
import { IsEnum } from '@joktec/utils';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { IPropOptions } from '../prop.decorator';

export interface EnumPropOptions extends PropOptionsForString {}

export function EnumProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  const enumValue = opts?.enum;
  decorators.push(IsEnum(enumValue, { each: swagger.isArray }));
  return decorators;
}
