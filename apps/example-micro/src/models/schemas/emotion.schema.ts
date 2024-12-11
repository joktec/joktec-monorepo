import { ObjectId, Prop, PropType, Ref, Schema } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { BaseSchema } from '../common';
import { EmotionStatus, EmotionType } from '../constants';
import { Article } from './article.schema';
import { Comment } from './comment.schema';
import { User } from './user.schema';

@Schema({ collection: 'emotions', index: ['targetId', 'authorId'], paranoid: true })
export class Emotion extends BaseSchema {
  @Prop({ required: true, enum: EmotionType })
  type!: EmotionType;

  @Prop({ required: true, enum: EmotionStatus, default: EmotionStatus.ACTIVATED })
  status!: EmotionStatus;

  @Prop({ required: true, enum: [Article.name, Comment.name, User.name] })
  target!: string;

  @Prop({ type: ObjectId, refPath: 'target', example: EXAMPLE_MONGO_ID })
  targetId?: Ref<Article | Comment, string>;

  @Prop({  })
  deepLink?: string;

  @Prop({ type: Object, default: () => Object.create(null) }, PropType.MAP)
  payload?: Record<string, any>;

  @Prop({ required: true, default: () => new Date() })
  actionAt!: Date;

  @Prop({ type: ObjectId, ref: () => User, required: true })
  authorId!: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: Article, ref: () => Article, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  article?: Ref<Article>;

  @Prop({ type: Comment, ref: () => Comment, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  comment?: Ref<Comment>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'targetId', justOne: true, example: {} })
  user?: Ref<User>;
}
