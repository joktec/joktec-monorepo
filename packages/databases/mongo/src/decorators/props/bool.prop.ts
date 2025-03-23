import { ApiPropertyOptions } from '@joktec/core';
import { IsBoolean } from '@joktec/utils';
import { BasePropOptions } from '@typegoose/typegoose/lib/types';
import { IPropOptions } from '../prop.decorator';

export interface BoolPropOptions extends BasePropOptions {}

export function BoolProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  decorators.push(IsBoolean({ each: swagger.isArray }));
  return decorators;
}
