import { toSlugify } from '@joktec/core';
import { isEmpty, isNil } from 'lodash';
import { Schema } from 'mongoose';

export interface SlugOptions {
  paddingSize?: number;
  unique?: boolean;
}

export function SlugPlugin(schema: Schema, options: SlugOptions) {
  schema.pre('validate', function (next, opts?: Record<string, any>) {
    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.slug) return;
      if (this.get(path)) return;

      const slugPaths: string[] = String(schemaType.options.slug).split(',');
      const valueToSlug = slugPaths
        .map(slugPath => this.get(slugPath))
        .filter(value => !isEmpty(value) && !isNil(value));
      if (!valueToSlug.length) return;

      const slugValue = toSlugify(...valueToSlug).trim();
      this.set(path, slugValue);
    });
    next();
  });
}
