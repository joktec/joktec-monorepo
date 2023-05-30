import { Transform } from 'class-transformer';
import { isNil } from 'lodash';

export * from './base-class.decorator';
export * from './base-method.decorator';
export * from './applyCustomDecorator';
export * from './response-message.decorator';

export const Default = (defaultValue: any): PropertyDecorator => {
  return Transform(({ value }) => (isNil(value) ? defaultValue : value));
};
