import { Expose, linkTransform } from '@joktec/core';
import { ObjectId, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { isEmpty } from 'lodash';
import { appConfig } from '../../app.config';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { IsCdnUrl } from '../../utils';
import { BaseSchema } from '../common';
import { AssetStatus } from '../constants';
import { User } from './user.schema';

@Schema({ collection: 'assets', textSearch: 'filename,originalName', index: ['authorId'], paranoid: true })
export class Asset extends BaseSchema {
  @Prop({ required: true, example: 'my_filename.png' })
  filename!: string;

  @Prop({ required: true, trim: true, immutable: true, example: 'my_filename.png' })
  originalName!: string;

  @Prop({ required: true, trim: true, immutable: true, example: `https://asset.domain.com/assets/my_filename.png` })
  @IsCdnUrl()
  key!: string;

  @Expose({ toPlainOnly: true })
  get thumbnail(): string {
    if (!this.key) return '';
    const { cdnUrl, resizeUrl } = appConfig.misc;
    const fullUrl = linkTransform(this.key, cdnUrl, 'absolute');
    return `${resizeUrl}/width=300,quality=100/${fullUrl}`;
  }

  @Prop({ trim: true, default: null, immutable: v => !isEmpty(v), example: 'f74b82c901415ff5e8c8ec13e31d2c8a' })
  etag!: string;

  @Prop({ trim: true, immutable: true, example: 'image/png' })
  mimeType!: string;

  @Prop({ type: [String], default: [] }, PropType.ARRAY)
  tags?: string[];

  @Prop({ default: 0, unsigned: true, example: 999 })
  size!: number;

  @Prop({ default: null, unsigned: true, example: 1920 })
  width?: number;

  @Prop({ default: null, unsigned: true, example: 1080 })
  height?: number;

  @Prop({ required: true, enum: AssetStatus, example: AssetStatus.ACTIVATED })
  status!: AssetStatus;

  @Prop({ type: ObjectId, ref: () => User, required: false, default: null, example: EXAMPLE_MONGO_ID })
  authorId?: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;
}
