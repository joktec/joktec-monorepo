import { Constructor, Wrapper } from '../../models';

export interface IApiFilterQueryOptions {
  textSearch?: boolean;
  geoSearch?: boolean;
  paginationMode?: 'page' | 'offset';
  relation?: boolean;
}

export type DecoratorOptions = { name: string };
export type ApiSchemaDecorator = <T extends Constructor<object>>(
  options: DecoratorOptions,
) => (constructor: T) => Wrapper<T>;
