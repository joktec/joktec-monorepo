import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { CategoryWhiteLabel } from './category-white-label';
import { CategoryStatus, CategoryType } from '../constants';

@Schema({
  collection: 'categories',
  textSearch: 'title,subhead',
  unique: 'code',
  paranoid: true,
  i18n: { locales: ['en', 'vi'], fallback: true },
})
export class Category extends MongoSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true, example: 'LF07PPCCCD' })
  code!: string;

  @Prop({ required: [true, 'TITLE_REQUIRED'], i18n: true, example: 'Passport' })
  title!: string;

  @Prop({ default: null, i18n: true })
  subhead?: string;

  @Prop({ default: null })
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

  @Prop({ default: null, i18n: true })
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
