import { ApiPropertyOptions } from '@joktec/core';
import { IsDate, MaxDate, MinDate, Type, ValidationOptions } from '@joktec/utils';
import { PropOptionsForString } from '@typegoose/typegoose/lib/types';
import { isArray, isNil } from 'lodash';
import { IPropOptions } from '../prop.decorator';

export interface DatePropOptions extends PropOptionsForString {
  minDate?: Date | (() => Date) | readonly [Date | (() => Date), string];
  maxDate?: Date | (() => Date) | readonly [Date | (() => Date), string];
}

export function DateProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  swagger.format = 'date-time';
  decorators.push(
    Type(() => Date),
    IsDate({ each: swagger.isArray }),
  );

  if (!isNil(opts.minDate)) {
    const minDate = isArray(opts.minDate) ? opts.minDate : [opts.minDate, undefined];
    const validatorOption: ValidationOptions = { each: swagger.isArray };
    if (minDate[1]) validatorOption.message = minDate[1];
    decorators.push(MinDate(minDate[0], validatorOption));
  }

  if (!isNil(opts.maxDate)) {
    const maxDate = isArray(opts.maxDate) ? opts.maxDate : [opts.maxDate, undefined];
    const validatorOption: ValidationOptions = { each: swagger.isArray };
    if (maxDate[1]) validatorOption.message = maxDate[1];
    decorators.push(MaxDate(maxDate[0], validatorOption));
  }

  return decorators;
}
