import { AdminRepo } from './common/admin.repo';
import { ArticleRepo } from './common/article.repo';
import { ArtistRepo } from './common/artist.repo';
import { AssetRepo } from './common/asset.repo';
import { BlockRepo } from './common/block.repo';
import { CategoryRepo } from './common/category.repo';
import { CommentRepo } from './common/comment.repo';
import { ConnectionRepo } from './common/connection.repo';
import { ContentRepo } from './common/content.repo';
import { CredentialRepo } from './common/credential.repo';
import { CronHistoryRepo } from './common/cron-history.repo';
import { CronRepo } from './common/cron.repo';
import { DataLogRepo } from './common/data-log.repo';
import { EmotionRepo } from './common/emotion.repo';
import { InquiryRepo } from './common/inquiry.repo';
import { NotificationRepo } from './common/notification.repo';
import { OtpRepo } from './common/otp.repo';
import { PostRepo } from './common/post.repo';
import { ProxyRepo } from './common/proxy.repo';
import { ReportRepo } from './common/report.repo';
import { SessionRepo } from './common/session.repo';
import { SettingRepo } from './common/setting.repo';
import { TagRepo } from './common/tag.repo';
import { UserRepo } from './common/user.repo';

export const MONGO_VERSION = '4.4.0';
export const Repositories = [
  AdminRepo,
  ArticleRepo,
  ArtistRepo,
  AssetRepo,
  BlockRepo,
  CategoryRepo,
  CommentRepo,
  ConnectionRepo,
  ContentRepo,
  CredentialRepo,
  CronRepo,
  CronHistoryRepo,
  EmotionRepo,
  InquiryRepo,
  DataLogRepo,
  NotificationRepo,
  OtpRepo,
  PostRepo,
  ProxyRepo,
  ReportRepo,
  SessionRepo,
  SettingRepo,
  TagRepo,
  UserRepo,
];

export * from './repository.module';

export * from './common/admin.repo';
export * from './common/article.repo';
export * from './common/artist.repo';
export * from './common/asset.repo';
export * from './common/block.repo';
export * from './common/category.repo';
export * from './common/comment.repo';
export * from './common/connection.repo';
export * from './common/content.repo';
export * from './common/credential.repo';
export * from './common/cron.repo';
export * from './common/cron-history.repo';
export * from './common/emotion.repo';
export * from './common/inquiry.repo';
export * from './common/data-log.repo';
export * from './common/notification.repo';
export * from './common/otp.repo';
export * from './common/post.repo';
export * from './common/proxy.repo';
export * from './common/report.repo';
export * from './common/session.repo';
export * from './common/setting.repo';
export * from './common/tag.repo';
export * from './common/user.repo';
