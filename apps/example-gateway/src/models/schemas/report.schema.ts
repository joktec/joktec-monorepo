import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { BaseSchema } from '../common';
import { ReportStatus } from '../constants';
import { Article } from './article.schema';
import { Comment } from './comment.schema';
import { Setting } from './setting.schema';
import { User } from './user.schema';

@Schema({ collection: 'reports', index: ['targetId', 'reasonIds', 'authorId'], paranoid: true })
export class Report extends BaseSchema {
  @Prop({ required: true, enum: [Article.name, Comment.name, User.name] })
  target!: string;

  @Prop({ type: ObjectId, refPath: 'target', example: EXAMPLE_MONGO_ID })
  targetId?: Ref<Article | Comment | User, string>;

  @Prop({ type: [ObjectId], ref: () => Setting, required: true, minSize: 1 })
  reasonIds!: Ref<Setting, string>[];

  @Prop({ default: null })
  reasonText?: string;

  @Prop({ default: null })
  sentAt?: Date;

  @Prop({ default: null })
  feedback?: string;

  @Prop({ default: null })
  respondedAt?: Date;

  @Prop({ required: true, enum: ReportStatus, default: ReportStatus.RECEIVED })
  status!: ReportStatus;

  @Prop({ type: ObjectId, ref: () => User, required: true })
  authorId!: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: [Setting], ref: () => Setting, foreignField: '_id', localField: 'reasonIds', example: [] })
  reason?: Ref<Setting>[];

  @Prop({ type: Article, ref: () => Article, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  article?: Ref<Article>;

  @Prop({ type: Comment, ref: () => Comment, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  comment?: Ref<Comment>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  user?: Ref<User>;
}
