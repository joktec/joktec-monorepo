import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { CommentStatus } from '../constants';
import { Article } from './article.schema';
import { User } from './user.schema';

@Schema({ collection: 'comments', textSearch: 'content', index: ['articleId', 'authorId', 'parentId'], paranoid: true })
export class Comment extends BaseSchema {
  @Prop({ required: true, trim: true })
  content!: string;

  @Prop({ default: 0, unsigned: true })
  seq?: number;

  @Prop({ default: 1, unsigned: true })
  depth?: number;

  @Prop({ required: true, enum: CommentStatus, default: CommentStatus.ACTIVATED })
  status!: CommentStatus;

  @Prop({ type: ObjectId, ref: () => Article, required: true })
  articleId!: Ref<Article, string>;

  @Prop({ type: ObjectId, ref: () => User, required: true })
  authorId!: Ref<User, string>;

  @Prop({ type: ObjectId, ref: () => Comment, default: null })
  parentId?: Ref<Comment, string>;

  // Virtual
  @Prop({ type: Article, ref: () => Article, foreignField: '_id', localField: 'articleId', justOne: true, example: {} })
  article?: Ref<Article>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: Comment, ref: () => Comment, foreignField: '_id', localField: 'parentId', justOne: true, example: {} })
  parent?: Ref<Comment>;

  @Prop({
    type: [Comment],
    ref: () => Comment,
    foreignField: 'parentId',
    localField: '_id',
    options: { sort: { seq: 1, createdAt: 1 } },
    example: [],
  })
  children?: Ref<Comment>[];
}
