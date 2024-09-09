import { IsUrl } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { PostStatus, PostType } from '../constants';
import { User } from './user.schema';

@Schema({
  collection: 'posts',
  textSearch: 'title.en,title.ko',
  index: ['targetUserIds', 'hiddenUserIds'],
  paranoid: true,
})
export class Post extends BaseSchema {
  @Prop({ required: true, trim: true, uppercase: true, immutable: true })
  code!: string;

  @Prop({ required: true })
  @I18nTransform()
  title!: I18nText;

  @Prop({ required: false, default: null })
  @I18nTransform()
  subhead?: I18nText;

  @Prop({ required: true, default: null })
  @I18nTransform()
  description?: I18nText;

  @Prop({ required: true, enum: PostType, default: PostType.NOTICE })
  type!: PostType;

  @Prop({ required: true })
  @IsCdnUrl()
  image!: string;

  @Prop({ required: false })
  @IsCdnUrl()
  background?: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: false })
  @IsUrl({ protocols: ['http', 'https'] })
  link?: string;

  @Prop({ required: true, enum: PostStatus, default: PostStatus.PENDING })
  status!: PostStatus;

  @Prop({ type: [ObjectId], ref: () => User, required: true, default: [] })
  targetUserIds?: Ref<User, string>[];

  @Prop({ type: [ObjectId], ref: () => User, required: true, default: [] })
  hiddenUserIds?: Ref<User, string>[];

  // Virtual
  @Prop({ type: [User], ref: () => User, foreignField: '_id', localField: 'targetUserIds' })
  targetUsers?: Ref<User>[];

  @Prop({ type: [User], ref: () => User, foreignField: '_id', localField: 'hiddenUserIds' })
  hiddenUsers?: Ref<User>[];
}
