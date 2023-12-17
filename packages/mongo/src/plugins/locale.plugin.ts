import { toBool } from '@joktec/core';
import { get, has, isArray, isEmpty, isNil, isUndefined, pickBy, set, unset } from 'lodash';
import mongoose, { Query, Schema, SchemaDefinitionProperty } from 'mongoose';

export interface LocaleOptions {
  locales: string[];
  default?: string;
  fallback?: boolean;
}

function allowKind(schemaType: mongoose.SchemaType): boolean {
  const isString = schemaType instanceof mongoose.Schema.Types.String;
  const isNotEnum = !schemaType.options.enum;
  return isString && isNotEnum;
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
    if (schemaType.schema && schemaType.options.i18n) {
      schemaType.schema.plugin(LocalePlugin, options);
      return;
    }
    if (!schemaType.options.i18n) return;
    if (!allowKind(schemaType)) {
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
  schema.add({ i18n: new Schema(i18nProperty, { timestamps: false, _id: false }) });

  schema.pre('validate', function (next, opts?: Record<string, any>) {
    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.i18n) return;
      if (!this.get(path)) return;

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

  const hook = function (doc: any, schema: Schema, lang: string = options.default) {
    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.i18n) return;
      if (!has(doc, path) && !has(doc, `i18n.${path}`)) return;

      if (schemaType.schema) {
        if (schemaType instanceof mongoose.Schema.Types.Array) {
          get(doc, path, []).forEach((subDoc: any) => hook(subDoc, schemaType.schema, lang));
          return;
        }

        hook(get(doc, path), schemaType.schema, lang);
        return;
      }

      const originValue = get(doc, path);
      const i18nPath = `i18n.${path}.${lang}`;
      if (!has(doc, `i18n`)) {
        set(doc, i18nPath, originValue);
        return;
      }

      if (lang !== options.default) unset(doc, path);
      else if (has(doc, i18nPath)) set(doc, path, get(doc, i18nPath));
    });
  };

  schema.pre<Query<any, any>>(['findOneAndUpdate', 'findOneAndReplace', 'updateOne', 'updateMany'], function (next) {
    const lang = getLanguage(this.getOptions().language);
    const data = this.getUpdate();
    hook(data, this.model.schema, lang);
    this.setUpdate(data);
    next();
  });

  function flattenI18n(doc: any, paths: string[], lang: string) {
    paths.map(path => {
      if (isNil(doc)) return;
      if (!has(doc, `i18n.${path}`)) return;
      let i18nValue = get(doc, `i18n.${path}.${lang}`, null);
      if (!i18nValue && options.fallback) {
        const originValue = get(doc, path);
        i18nValue = get(doc, `i18n.${path}.${options.default}`, originValue);
      }
      set(doc, path, i18nValue);
    });
    if (has(doc, 'i18n')) unset(doc, 'i18n');
  }

  function makeupItem(doc: any, schema: Schema, lang: string) {
    const paths: string[] = [];

    schema.eachPath((path, schemaType) => {
      if (!schemaType.options.i18n) return;
      if (schemaType.schema) {
        if (isArray(doc)) doc.map(item => makeupItem(item[path], schemaType.schema, lang));
        else makeupItem(doc[path], schemaType.schema, lang);
        return;
      }
      paths.push(path);
    });

    if (isArray(doc)) doc.map(item => flattenI18n(item, paths, lang));
    else flattenI18n(doc, paths, lang);
  }

  schema.post(/^find/, function (res: any, next) {
    if (isEmpty(res)) return next();
    const lang = getLanguage(this.getOptions().language);
    makeupItem(res, this.model.schema, lang);
    next();
  });
};
