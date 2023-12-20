import { IsEnum } from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { IPropOptions } from '../prop.decorator';

export type EnumPropOptions = PropOptionsForString & {};

export function EnumProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  const enumValue = opts?.enum;
  decorators.push(IsEnum(enumValue, { each: swagger.isArray }));
  return decorators;
}
