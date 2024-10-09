import {
  ApiPropertyOptions,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  toArray,
  toInt,
  Transform,
  ValidationOptions,
} from '@joktec/core';
import { ArrayPropOptions as PropOptionsForArray } from '@typegoose/typegoose/lib/types';
import { isArray, isNil, uniq } from 'lodash';
import { IPropOptions } from '../prop.decorator';

export interface ArrayPropOptions extends PropOptionsForArray {
  minSize?: number | readonly [number, string];
  maxSize?: number | readonly [number, string];
  uniqItems?: boolean;
}

export function ArrayProps(opts: IPropOptions, swagger: ApiPropertyOptions): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];

  const isArrayType = toInt(opts?.dim, 1) > 1;
  decorators.push(IsArray({ each: isArrayType }));

  if (!isNil(opts.minSize)) {
    const minSize = isArray(opts.minSize) ? opts.minSize : [opts.minSize, undefined];
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (minSize[1]) validatorOption.message = minSize[1];
    decorators.push(ArrayMinSize(minSize[0], validatorOption));
    swagger.minItems = minSize[0];
  }

  if (!isNil(opts.maxSize)) {
    const maxSize = isArray(opts.maxSize) ? opts.maxSize : [opts.maxSize, undefined];
    const validatorOption: ValidationOptions = { each: isArrayType };
    if (maxSize[1]) validatorOption.message = maxSize[1];
    decorators.push(ArrayMaxSize(maxSize[0], validatorOption));
    swagger.maxItems = maxSize[0];
  }

  if (opts.uniqItems) {
    decorators.push(Transform(({ value }) => (!value ? [] : uniq(toArray(value)))));
  }

  return decorators;
}
