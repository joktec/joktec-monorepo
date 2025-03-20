import { ApiPropertyOptional } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { Expose, linkTransform } from '@joktec/utils';
import { appConfig } from '../../app.config';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { IsCdnUrl } from '../../utils';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { ArtistGender, ArtistStatus, ArtistType } from '../constants';
import { Article } from './article.schema';
import { Category } from './category.schema';

@Schema({ collection: 'artists', textSearch: 'hiddenText,name.ko,name.en', index: ['categoryIds'], paranoid: true })
export class Artist extends BaseSchema {
  @Prop({ required: true })
  @I18nTransform()
  name!: I18nText;

  @Prop({ required: true, enum: ArtistType, default: ArtistType.DEFAULT })
  type!: ArtistType;

  @Prop({ required: true, enum: ArtistGender, default: ArtistGender.UNKNOWN })
  gender!: ArtistGender;

  @Prop({ default: null })
  @IsCdnUrl()
  avatar?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.avatar, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ required: true, enum: ArtistStatus, default: ArtistStatus.ACTIVATED })
  status!: ArtistStatus;

  @Prop({ default: '', hidden: true })
  hiddenText?: string;

  @Prop({ type: [ObjectId], ref: () => Category, required: true, default: [], example: [EXAMPLE_MONGO_ID] })
  categoryIds?: Ref<Category, string>[];

  @Expose({ toPlainOnly: true })
  @ApiPropertyOptional()
  isSelected?: boolean;

  // Virtual
  @Prop({ type: [Category], ref: () => Category, foreignField: '_id', localField: 'categoryIds', example: [] })
  categories?: Ref<Category>[];

  @Prop({ type: [Article], ref: () => Article, foreignField: 'artistIds', localField: '_id', example: [] })
  articles?: Ref<Article>[];
}
