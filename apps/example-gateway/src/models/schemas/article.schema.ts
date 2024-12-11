import { ApiPropertyOptional, Expose, plainToInstance } from '@joktec/core';
import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';
import { BaseSchema } from '../common';
import { ArticleResource, ArticleStatus, ArticleType } from '../constants';
import { ArticleFile, ArticleSummary } from '../objects';
import { Artist } from './artist.schema';
import { Tag } from './tag.schema';
import { User } from './user.schema';

@Schema({
  collection: 'articles',
  textSearch: 'title,subhead,description',
  index: ['authorId', 'artistIds', 'tagIds', 'parentId', 'postedAt'],
  paranoid: true,
})
export class Article extends BaseSchema {
  @Prop({ trim: true, default: '', example: 'This is a title' })
  title!: string;

  @Prop({ trim: true, default: '', example: 'This is a subhead' })
  subhead?: string;

  @Prop({ trim: true, default: '', example: 'This is a description' })
  description!: string;

  @Prop({ required: true, enum: ArticleType, default: ArticleType.DEFAULT })
  type!: ArticleType;

  @Prop({ required: true, default: () => new Date() })
  postedAt!: Date;

  @Prop({ required: true, default: () => new Date() })
  modifiedAt!: Date;

  @Prop({ type: [ArticleFile], required: true, default: [], example: () => [new ArticleFile()] })
  files!: ArticleFile[];

  @Prop({ required: true, enum: ArticleStatus, default: ArticleStatus.ACTIVATED })
  status!: ArticleStatus;

  @Prop({ type: ArticleSummary, required: true, default: () => new ArticleSummary() })
  summary!: ArticleSummary;

  @Prop({ type: [String], default: [] })
  rawHashtags?: string[];

  @Prop({ enum: ArticleResource, default: ArticleResource.DEFAULT })
  resource?: ArticleResource;

  @Prop({ default: null })
  resourceId?: string;

  @Prop({ type: ObjectId, ref: () => User, default: null, example: EXAMPLE_MONGO_ID })
  authorId?: Ref<User, string>;

  @Prop({ type: ObjectId, ref: () => Article, default: null })
  parentId?: Ref<Article, string>;

  @Prop({ type: [ObjectId], ref: () => Artist, required: true, default: [], example: [EXAMPLE_MONGO_ID] })
  artistIds?: Ref<Artist, string>[];

  @Prop({ type: [ObjectId], ref: () => Tag, required: true, default: [], example: [EXAMPLE_MONGO_ID] })
  tagIds?: Ref<Tag, string>[];

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'authorId', justOne: true, example: {} })
  author?: Ref<User>;

  @Prop({ type: [Artist], ref: () => Artist, foreignField: '_id', localField: 'artistIds', example: {} })
  artists?: Ref<Artist>[];

  @Prop({ type: [Tag], ref: () => Tag, foreignField: '_id', localField: 'tagIds', example: [] })
  tags?: Ref<Tag>[];

  @Prop({ type: Article, ref: () => Article, foreignField: '_id', localField: 'parentId', justOne: true, example: {} })
  parent?: Ref<Article>;

  @Prop({ type: [Article], ref: () => Article, foreignField: 'parentId', localField: '_id', example: [] })
  children?: Ref<Article>[];

  @Expose({ toPlainOnly: true })
  @ApiPropertyOptional({ example: ['tag1', 'tag2'] })
  public get hashtags(): string[] {
    return plainToInstance(Tag, this.tags || []).map((tag: Tag) => tag.title);
  }
}
