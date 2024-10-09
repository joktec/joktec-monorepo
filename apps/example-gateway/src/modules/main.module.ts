import { Global, Module } from '@joktec/core';
import { ArticleModule } from './articles';
import { ArtistModule } from './artists';
import { AssetModule } from './assets';
import { AuthModule } from './auth';
import { BlockModule } from './blocks';
import { CategoryModule } from './categories';
import { CommentModule } from './comments';
import { ConnectionModule } from './connections';
import { ContentModule } from './contents';
import { EmotionModule } from './emotions';
import { InquiryModule } from './inquiries';
import { NotificationModule } from './notifications';
import { OtpModule } from './otpLogs';
import { PostModule } from './posts';
import { ProductModule } from './products';
import { ProfileModule } from './profile';
import { ReportModule } from './reports';
import { SessionModule } from './sessions';
import { SettingModule } from './settings';
import { TagModule } from './tags';
import { UserModule } from './users';

@Global()
@Module({
  imports: [
    ArticleModule,
    ArtistModule,
    AssetModule,
    AuthModule,
    BlockModule,
    CategoryModule,
    CommentModule,
    ConnectionModule,
    ContentModule,
    EmotionModule,
    InquiryModule,
    NotificationModule,
    OtpModule,
    PostModule,
    ProfileModule,
    ReportModule,
    SessionModule,
    SettingModule,
    TagModule,
    UserModule,
    ProductModule,
  ],
})
export class MainModule {}
