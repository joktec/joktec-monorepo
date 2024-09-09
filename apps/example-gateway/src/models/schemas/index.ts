import { Admin } from './admin.schema';
import { Article } from './article.schema';
import { Artist } from './artist.schema';
import { Asset } from './asset.schema';
import { Block } from './block.schema';
import { Category } from './category.schema';
import { Comment } from './comment.schema';
import { Connection } from './connection.schema';
import { Content } from './content.schema';
import { CronHistory } from './cron-history.schema';
import { CronSchema } from './cron.schema';
import { Emotion } from './emotion.schema';
import { Inquiry } from './inquiry.schema';
import { Notification } from './notification.schema';
import { Otp } from './otp.schema';
import { Post } from './post.schema';
import { Report } from './report.schema';
import { Session } from './session.schema';
import { Setting } from './setting.schema';
import { Tag } from './tag.schema';
import { User } from './user.schema';

export const SCHEMAS = [
  Admin,
  Article,
  Artist,
  Asset,
  Block,
  Category,
  Comment,
  Connection,
  Content,
  CronSchema,
  CronHistory,
  Emotion,
  Inquiry,
  Notification,
  Otp,
  Post,
  Report,
  Session,
  Setting,
  Tag,
  User,
];

export * from './admin.schema';
export * from './article.schema';
export * from './artist.schema';
export * from './asset.schema';
export * from './block.schema';
export * from './category.schema';
export * from './comment.schema';
export * from './connection.schema';
export * from './content.schema';
export * from './cron.schema';
export * from './cron-history.schema';
export * from './data-log.schema';
export * from './emotion.schema';
export * from './inquiry.schema';
export * from './notification.schema';
export * from './otp.schema';
export * from './post.schema';
export * from './report.schema';
export * from './session.schema';
export * from './setting.schema';
export * from './tag.schema';
export * from './user.schema';
