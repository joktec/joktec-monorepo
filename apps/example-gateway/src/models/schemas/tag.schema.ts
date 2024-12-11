import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema, I18nText, I18nTransform } from '../common';
import { TagStatus } from '../constants';
import { User } from './user.schema';

@Schema({
  collection: 'tags',
  textSearch: 'title,hiddenText.en,hiddenText.ko',
  index: ['authorId', 'parentId'],
  paranoid: true,
})
export class Tag extends BaseSchema {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ default: null })
  @I18nTransform()
  hiddenText?: I18nText;

  @Prop({ required: true, enum: TagStatus })
  status!: TagStatus;

  @Prop({ type: ObjectId, ref: () => User, required: false })
  authorId?: Ref<User, string>;

  @Prop({ type: ObjectId, ref: () => Tag, default: null })
  parentId?: Ref<Tag, string>;

  // Virtual
  @Prop({
    type: User,
    ref: () => User,
    foreignField: '_id',
    localField: 'authorId',
    justOne: true,
    example: {},
  })
  author?: Ref<User>;

  @Prop({ type: Tag, ref: () => Tag, foreignField: '_id', localField: 'parentId', justOne: true, example: {} })
  parent?: Ref<Tag>;

  @Prop({ type: [Tag], ref: () => Tag, foreignField: 'parentId', localField: '_id', example: [] })
  children?: Ref<Tag>[];
}
