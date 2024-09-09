import { Expose, linkTransform } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';
import { appConfig } from '../../app.config';
import { IsCdnUrl } from '../../utils';
import { BaseSubSchema } from '../common';
import { ArticleFileStatus, ArticleFileType } from '../constants';
import { ArticleElement } from './article-element.schema';

@Schema({ schemaOptions: { _id: true, timestamps: true } })
export class ArticleFile extends BaseSubSchema {
  @Prop({ required: false })
  caption?: string;

  @Prop({ required: true, enum: ArticleFileType })
  type!: ArticleFileType;

  @Prop({ required: true })
  @IsCdnUrl()
  url!: string;

  @Prop({ required: true })
  @IsCdnUrl()
  preview!: string;

  @Prop({ required: false })
  @IsCdnUrl()
  originalUrl?: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const url = this.type === ArticleFileType.IMAGE ? this.url : this.preview;
    const fullUrl = linkTransform(url, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Expose({ toPlainOnly: true })
  get previewThumbnail(): string {
    if (!this.preview) return undefined;
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.preview, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ required: false, default: '*/*', example: 'image/png' })
  mimetype?: string;

  @Prop({ required: false, default: 0, unsigned: true })
  width?: number;

  @Prop({ required: false, default: 0, unsigned: true })
  height?: number;

  @Prop({ required: false, default: 0, unsigned: true })
  ratio?: number;

  @Prop({ required: false, default: 0, unsigned: true })
  seq?: number;

  @Prop({ type: [Number], required: false, default: null })
  filter?: number[];

  @Prop({ type: [ArticleElement], required: true, default: [] })
  elements?: ArticleElement[];

  @Prop({ required: true, enum: ArticleFileStatus, default: ArticleFileStatus.ACTIVATED })
  status?: ArticleFileStatus;
}
