import { toBool } from '@joktec/core';
import { get, has, isArray, isEmpty, isUndefined, pickBy, set } from 'lodash';
import mongoose, { Schema, SchemaDefinitionProperty } from 'mongoose';

export interface LocaleOptions {
  locales: string[];
  default?: string;
  fallback?: boolean;
}

export const LocalePlugin = (schema: Schema, options?: LocaleOptions) => {
  if (!options || !options.locales || !options.locales.length) {
    throw new mongoose.Error('Required languages array is missing');
  }

  function getLanguage(langOpts?: string): string {
    const lang = langOpts || options.default;
    return !options.locales.includes(lang) ? options.default : lang;
  }

  const i18nProperty: SchemaDefinitionProperty = {};
  schema.eachPath((path, schemaType) => {
    if (schemaType.schema) return schemaType.schema.plugin(LocalePlugin, options);
    if (!schemaType.options.i18n) return;
    if (!(schemaType instanceof mongoose.Schema.Types.String) || schemaType.options.enum) {
      throw new mongoose.Error('i18n can be used with String type only');
    }

    options.locales.map(locale => {
      const required = toBool(schemaType.options.required, false);
      const transformKeys = ['default', 'lowercase', 'uppercase', 'trim', 'match', 'minLength', 'maxLength'];
      const transformOpts = pickBy(schemaType.options, (v, k) => {
        return transformKeys.includes(k) && !isUndefined(v);
      });

      set(i18nProperty, [path, locale], {
        ...transformOpts,
        type: String,
        required: required && locale === options.default,
      });
    });
  });

  if (isEmpty(i18nProperty)) return;
  schema.add({ i18n: i18nProperty });

  schema.pre('validate', function (next, opts?: Record<string, any>) {
    schema.eachPath((path, _) => {
      // Insert
      if (this.isNew) {
        options.locales.map(locale => this.set(`i18n.${path}.${locale}`, this.get(path)));
        return;
      }

      // For upsert
      const lang = getLanguage(opts?.language);
      this.set(`i18n.${path}.${lang}`, this.get(path));
      if (lang !== options.default) this.set(path, undefined);
    });
    next();
  });

  schema.pre(['findOneAndUpdate', 'findOneAndReplace', 'updateOne', 'updateMany'], function (next) {
    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.i18n) return;
      const lang = getLanguage(this.getOptions().language);

      if (!this.get(path)) return;
      const originValue = this.get(path);

      if (lang !== options.default) this.set(path, undefined);
      this.set(`i18n.${path}.${lang}`, originValue);
    });
    next();
  });

  function makeupItem(item: any, path: string, lang: string) {
    if (has(item, `i18n.${path}`)) {
      let value = get(item, `i18n.${path}.${lang}`, null);
      if (!value && options.fallback) {
        value = get(item, `i18n.${path}.${options.default}`, null);
      }
      set(item, path, value);
    }
    delete item.i18n;
  }

  schema.post(/^find/, function (res: any, next) {
    if (isEmpty(res)) return next();
    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.i18n) return;
      const lang = getLanguage(this.getOptions().language);
      if (isArray(res)) res.map(item => makeupItem(item, path, lang));
      else makeupItem(res, path, lang);
    });
    next();
  });
};
