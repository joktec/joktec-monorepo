import { applyDecorators } from '@joktec/core';
import { prop } from '@typegoose/typegoose';
import {
  ArrayPropOptions,
  BasePropOptions,
  MapPropOptions,
  PropOptionsForNumber,
  PropOptionsForString,
  VirtualOptions,
} from '@typegoose/typegoose/lib/types';
import { PropType } from '@typegoose/typegoose/lib/internal/constants';

export type IPropOptions = (
  | BasePropOptions
  | ArrayPropOptions
  | MapPropOptions
  | PropOptionsForNumber
  | PropOptionsForString
  | VirtualOptions
) & {
  strictRef?: boolean;
};

export const Prop = (opts?: IPropOptions, kind?: PropType): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    applyDecorators(prop(opts, kind))(target, propertyKey);
  };
};
