import { ArrayMaxSize, ArrayMinSize, IsArray, toInt, ValidationOptions } from '@joktec/core';
import { ArrayPropOptions as PropOptionsForArray } from '@typegoose/typegoose/lib/types';
import { isArray, isNil } from 'lodash';
import { IPropOptions } from '../prop.decorator';

export type ArrayPropOptions = PropOptionsForArray & {
  notEmpty?: boolean;
  minSize?: number | readonly [number, string];
  maxSize?: number | readonly [number, string];
};

export function ArrayProps(opts: IPropOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  const isArrayType = toInt(opts?.dim, 1) > 1;
  decorators.push(IsArray({ each: isArrayType }));

  if (!isNil(opts.minSize)) {
    const minSize = isArray(opts.minSize) ? opts.minSize : [opts.minSize, undefined];
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (minSize[1]) validatorOption.message = minSize[1];
    decorators.push(ArrayMinSize(minSize[0], validatorOption));
  }

  if (!isNil(opts.maxSize)) {
    const maxSize = isArray(opts.maxSize) ? opts.maxSize : [opts.maxSize, undefined];
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (maxSize[1]) validatorOption.message = maxSize[1];
    decorators.push(ArrayMaxSize(maxSize[0], validatorOption));
  }

  return decorators;
}
