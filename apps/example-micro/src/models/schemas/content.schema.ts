import { Expose, linkTransform } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { appConfig } from '../../app.config';
import { IsCdnUrl } from '../../utils';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { AppContentStatus, AppContentType } from '../constants';

@Schema({ collection: 'app_contents', unique: ['code'], index: ['parentId'], paranoid: true })
export class Content extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  @I18nTransform()
  title!: I18nText;

  @Prop({ default: null })
  @I18nTransform()
  subhead?: I18nText;

  @Prop({ default: null })
  @I18nTransform()
  description?: I18nText;

  @Prop({ required: true, enum: AppContentType, default: AppContentType.DEFAULT })
  type!: AppContentType;

  @Prop({ trim: true, default: null })
  @IsCdnUrl()
  link?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  image?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    if (!this.image) return undefined;
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.image, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ default: 0, unsigned: true })
  seq?: number;

  @Prop({ type: ObjectId, ref: () => Content, default: null })
  parentId?: Ref<Content, string>;

  @Prop({ required: true, enum: AppContentStatus, default: AppContentStatus.ACTIVATED })
  status!: AppContentStatus;

  // Virtual
  @Prop({ type: Content, ref: () => Content, foreignField: '_id', localField: 'parentId', justOne: true, example: {} })
  parent?: Ref<Content>;

  @Prop({
    type: [Content],
    ref: () => Content,
    foreignField: 'parentId',
    localField: '_id',
    options: { sort: { seq: 1 } },
    example: [],
  })
  children?: Ref<Content>[];
}
