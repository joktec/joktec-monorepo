import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { BaseSchema } from '../common';
import { BlockStatus } from '../constants';
import { Article } from './article.schema';
import { Setting } from './setting.schema';
import { User } from './user.schema';

@Schema({ collection: 'blocks', index: ['targetId'], paranoid: true })
export class Block extends BaseSchema {
  @Prop({ required: true, enum: [Article.name, User.name] })
  target!: string;

  @Prop({ type: ObjectId, refPath: 'target', required: true, example: EXAMPLE_MONGO_ID })
  targetId!: Ref<Article | User, string>;

  @Prop({ type: [ObjectId], ref: () => Setting, required: true, uniqItems: true, default: [] })
  reasonIds!: Ref<Setting, string>[];

  @Prop({ default: null })
  reasonText?: string;

  @Prop({ default: () => new Date() })
  sentAt?: Date;

  @Prop({ required: true, enum: BlockStatus, default: BlockStatus.ACTIVATED })
  status!: BlockStatus;

  @Prop({ type: ObjectId, ref: () => User, required: true })
  authorId!: Ref<User, string>;

  // Virtual
  @Prop({ type: Article, ref: () => Article, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  article?: Ref<Article>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  user?: Ref<User>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: [Setting], ref: () => Setting, foreignField: '_id', localField: 'reasonIds', example: [] })
  reasons?: Ref<Setting>[];
}
