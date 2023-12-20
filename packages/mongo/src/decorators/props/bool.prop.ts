import { IsBoolean } from '@joktec/core';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { BasePropOptions } from '@typegoose/typegoose/lib/types';
import { IPropOptions } from '../prop.decorator';

export type BoolPropOptions = BasePropOptions & {};

export function BoolProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  decorators.push(IsBoolean({ each: swagger.isArray }));
  return decorators;
}
