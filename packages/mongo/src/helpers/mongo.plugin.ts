import { toArray } from '@joktec/core';
import { plugin } from '@typegoose/typegoose';
import { get, head } from 'lodash';
import { ISchemaOptions } from '../decorators';
import { ObjectId } from '../models';
import {
  LocaleOptions,
  LocalePlugin,
  ParanoidOptions,
  ParanoidPlugin,
  SlugOptions,
  SlugPlugin,
  StrictReferencePlugin,
  TransformPlugin,
  UniquePlugin,
} from '../plugins';

export function buildPlugin(options: ISchemaOptions): ClassDecorator[] {
  const plugins = toArray(options.plugins).map(p => plugin(p.mongoosePlugin, p.options));

  const deletedAt: string = get(options, 'paranoid.deletedAt.name', 'deletedAt');
  const opts = { paranoidKey: options?.paranoid ? deletedAt : null };
  plugins.push(plugin(StrictReferencePlugin, opts));

  if (options.paranoid) {
    const paranoidOpts: ParanoidOptions = {
      deletedAt: { name: 'deletedAt', type: Date },
      deletedBy: { name: 'deletedBy', type: ObjectId },
    };
    if (typeof options?.paranoid === 'object') {
      Object.assign(paranoidOpts, options.paranoid);
    }
    plugins.push(plugin(ParanoidPlugin, paranoidOpts));
  }

  if (options.slug) {
    const slugOptions: SlugOptions = { unique: false, paddingSize: 6 };
    if (typeof options?.i18n === 'object') Object.assign(slugOptions, options.i18n);
    plugins.push(plugin(SlugPlugin, slugOptions));
  }

  if (options.i18n) {
    const i18nOption: LocaleOptions = Object.assign({ locales: ['en'], fallback: false }, options.i18n);
    if (!i18nOption.locales.includes(i18nOption.default || '')) {
      i18nOption.default = head(i18nOption.locales);
    }
    plugins.push(plugin(LocalePlugin, i18nOption));
  }

  plugins.push(plugin(UniquePlugin, {}));
  plugins.push(plugin(TransformPlugin));
  return plugins;
}
