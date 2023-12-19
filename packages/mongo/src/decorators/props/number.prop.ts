import { IsNumber, Max, Min } from '@joktec/core';
import { PropOptionsForNumber } from '@typegoose/typegoose/lib/types';
import { isArray, isNil, isNumber } from 'lodash';
import { IPropOptions } from '../prop.decorator';

export type NumberPropOptions = PropOptionsForNumber & {
  unsigned?: boolean | [boolean, string] | readonly [boolean, string];
};

export function NumberProps(opts: IPropOptions, isArrayType: boolean): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  decorators.push(IsNumber({}, { each: isArrayType }));

  if (opts.unsigned) {
    opts.min = [0, undefined];
    if (isArray(opts.unsigned) && opts.unsigned[1]) {
      opts.min = [0, opts.unsigned[1]];
    }
  }

  if (!isNil(opts.min)) {
    const defMsg = '$property must be greater than equals $constraint1';
    if (isArray(opts.min) && isNumber(opts.min[0])) {
      decorators.push(Min(opts.min[0], { message: opts.min[1] || defMsg, each: isArrayType }));
    }
    if (isNumber(opts.min)) {
      decorators.push(Min(opts.min, { message: defMsg, each: isArrayType }));
    }
  }

  if (!isNil(opts.max)) {
    const defMsg = '$property must be lower than equals $constraint1';
    if (isArray(opts.max) && isNumber(opts.max[0])) {
      const validatorOption = { message: opts.max[1] || defMsg, each: isArrayType };
      decorators.push(Max(opts.max[0], validatorOption));
    }
    if (isNumber(opts.max)) {
      decorators.push(Max(opts.max, { message: defMsg, each: isArrayType }));
    }
  }

  return decorators;
}
