import { IsNumber, IsPositive, Max, Min } from '@joktec/core';
import { PropOptionsForNumber } from '@typegoose/typegoose/lib/types';
import { isArray, isNumber } from 'lodash';
import { IPropOptions } from '../prop.decorator';

export type NumberPropOptions = PropOptionsForNumber & {
  unsigned?: boolean | [boolean, string] | readonly [boolean, string];
};

export function NumberProps(opts: IPropOptions, isArrayType: boolean): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  decorators.push(IsNumber({}, { each: isArrayType }));

  if (opts.unsigned) {
    if (isArray(opts.unsigned) && opts.unsigned[0]) {
      const validatorOption = { message: opts.unsigned[1], each: isArrayType };
      decorators.push(IsPositive(validatorOption));
    }
    if (opts.unsigned === true) {
      decorators.push(IsPositive({ each: isArrayType }));
    }
  }

  if (opts.min) {
    if (isArray(opts.min) && isNumber(opts.min[0])) {
      const validatorOption = { message: opts.min[1], each: isArrayType };
      decorators.push(Min(opts.min[0], validatorOption));
    }
    if (isNumber(opts.min)) {
      decorators.push(Min(opts.min, { each: isArrayType }));
    }
  }

  if (opts.max) {
    if (isArray(opts.max) && isNumber(opts.max[0])) {
      const validatorOption = { message: opts.max[1], each: isArrayType };
      decorators.push(Max(opts.max[0], validatorOption));
    }
    if (isNumber(opts.max)) {
      decorators.push(Max(opts.max, { each: isArrayType }));
    }
  }

  return decorators;
}
