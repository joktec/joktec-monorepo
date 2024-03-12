import { applyDecorators, Transform } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { isNil, isObject, isString } from 'lodash';
import { I18nContext } from 'nestjs-i18n';
import { UserRole } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class I18nText {
  constructor(props?: Partial<I18nText>) {
    Object.assign(props);
  }

  static create(props?: Partial<I18nText>): I18nText {
    return new I18nText(props);
  }

  @Prop({ required: [true, 'TITLE_REQUIRED'], example: 'Passport' })
  en?: string;

  @Prop({ required: false, example: 'Passport' })
  vi?: string;
}

export const I18nTransform = (): PropertyDecorator => {
  return applyDecorators(
    Transform(
      ({ value }) => {
        return isNil(value) || isString(value) ? value : value[I18nContext.current().lang || 'en'];
      },
      { toPlainOnly: true, groups: [UserRole.USER] },
    ),
    Transform(
      ({ value }) => {
        const lang = I18nContext.current().lang || 'en';
        return isNil(value) || isObject(value) ? value : I18nText.create({ [lang]: value });
      },
      { toClassOnly: true, groups: [UserRole.USER] },
    ),
    Transform(
      ({ value }) => {
        const lang = I18nContext.current().lang || 'en';
        return isNil(value) || isObject(value) ? value : I18nText.create({ [lang]: value });
      },
      { groups: [UserRole.ADMIN] },
    ),
  );
};
