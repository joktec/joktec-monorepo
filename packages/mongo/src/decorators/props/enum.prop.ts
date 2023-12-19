import { IsEnum } from '@joktec/core';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { IPropOptions } from '../prop.decorator';

export type EnumPropOptions = PropOptionsForString & {};

export function EnumProps(opts: IPropOptions, isArrayType: boolean): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  const enumValue = opts?.enum;
  decorators.push(IsEnum(enumValue, { each: isArrayType }));
  return decorators;
}
