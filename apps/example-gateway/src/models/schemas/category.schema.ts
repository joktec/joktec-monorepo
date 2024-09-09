import { Expose, linkTransform } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { appConfig } from '../../app.config';
import { IsCdnUrl } from '../../utils';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { CategoryStatus, CategoryType } from '../constants';
import { Artist } from './artist.schema';

@Schema({ collection: 'categories', textSearch: 'title.en,title.ko', index: ['parentId'], paranoid: true })
export class Category extends BaseSchema {
  @Prop({ required: [true, 'TITLE_REQUIRED'] })
  @I18nTransform()
  title!: I18nText;

  @Prop({ default: null })
  @I18nTransform()
  subhead?: I18nText;

  @Prop({ default: null })
  @I18nTransform()
  description?: I18nText;

  @Prop({ required: true, enum: CategoryType, example: CategoryType.DEFAULT })
  type!: CategoryType;

  @Prop({ default: null, example: 'https://example.com/image.png' })
  @IsCdnUrl()
  image?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    if (!this.image) return '';
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.image, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ default: 0, unsigned: true })
  seq?: number;

  @Prop({ type: ObjectId, ref: () => Category, default: null })
  parentId?: Ref<Category, string>;

  @Prop({ required: true, enum: CategoryStatus, example: CategoryStatus.ACTIVATED })
  status!: CategoryStatus;

  // Virtual
  @Prop({
    type: Category,
    ref: () => Category,
    foreignField: '_id',
    localField: 'parentId',
    justOne: true,
    example: {},
  })
  parent?: Ref<Category>;

  @Prop({
    type: [Category],
    ref: () => Category,
    foreignField: 'parentId',
    localField: '_id',
    options: { sort: { seq: 1 } },
    example: [],
  })
  children?: Ref<Category>[];

  @Prop({ type: [Artist], ref: () => Artist, foreignField: 'categoryIds', localField: '_id', example: {} })
  artists?: Ref<Artist>[];
}
