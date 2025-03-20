import { applyDecorators } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { Transform } from '@joktec/utils';
import { isNil, isObject, isString } from 'lodash';
import { I18nContext } from 'nestjs-i18n';
import { DEFAULT_LOCALE } from '../../app.constant';

export enum I18nGroup {
  FULL = 'full',
  TRANSLATE = 'translate',
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class I18nText {
  constructor(props?: Partial<I18nText>) {
    Object.assign(props);
  }

  static create(props?: Partial<I18nText>): I18nText {
    return new I18nText(props);
  }

  @Prop({ required: true, example: '라이프스타일' })
  ko!: string;

  @Prop({ example: 'Lifestyle' })
  en?: string;
}

export const I18nTransform = (): PropertyDecorator => {
  return applyDecorators(
    Transform(
      ({ value }) => {
        return isNil(value) || isString(value) ? value : value[I18nContext.current()?.lang || DEFAULT_LOCALE];
      },
      { toPlainOnly: true, groups: [I18nGroup.TRANSLATE] },
    ),
    Transform(
      ({ value }) => {
        const lang = I18nContext.current()?.lang || DEFAULT_LOCALE;
        return isNil(value) || isObject(value) ? value : I18nText.create({ [lang]: value });
      },
      { toClassOnly: true, groups: [I18nGroup.TRANSLATE] },
    ),
    Transform(
      ({ value }) => {
        const lang = I18nContext.current()?.lang || DEFAULT_LOCALE;
        return isNil(value) || isObject(value) ? value : I18nText.create({ [lang]: value });
      },
      { groups: [I18nGroup.FULL] },
    ),
  );
};
