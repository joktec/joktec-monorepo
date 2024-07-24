import { Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../../base';
import { IsCdnUrl } from '../../utils';
import { CategoryStatus, CategoryType } from '../constants';
import { CategoryWhiteLabel } from './category-white-label';
import { I18nText, I18nTransform } from './i18n-text';

@Schema({ collection: 'categories', textSearch: '$**', unique: ['code'], paranoid: true })
export class Category extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true, example: 'LF07PPCCCD' })
  code!: string;

  @Prop({ required: [true, 'TITLE_REQUIRED'], example: 'Passport' })
  @I18nTransform()
  title!: I18nText;

  @Prop({ default: null })
  @I18nTransform()
  subhead?: string;

  @Prop({ default: null })
  @I18nTransform()
  description?: string;

  @Prop({ required: true, enum: CategoryType, example: CategoryType.CATALOG })
  type!: CategoryType;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  image?: string;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  thumbnail?: string;

  @Prop({ default: 0, unsigned: true })
  order?: number;

  @Prop({ required: true, default: 0, unsigned: true })
  cost!: number;

  @Prop({ default: 0, unsigned: true })
  commission!: number;

  @Prop({ default: null })
  whiteLabel?: CategoryWhiteLabel;

  @Prop({ type: String, ref: () => Category, default: null, strictRef: true })
  parentId?: Ref<Category, string>;

  @Prop({ required: true, enum: CategoryStatus, example: CategoryStatus.ACTIVATED })
  status!: CategoryStatus;

  // Virtual
  @Prop({ type: Category, ref: () => Category, foreignField: '_id', localField: 'parentId', justOne: true })
  parent?: Ref<Category>;

  @Prop({
    type: [Category],
    ref: () => Category,
    foreignField: 'parentId',
    localField: '_id',
    strictRef: true,
    options: { sort: { order: 1 } },
  })
  children?: Ref<Category>[];
}
