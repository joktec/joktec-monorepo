import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule, RedisCacheService } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './modules/organization/organization.module';
import { OrganizationArticleModule } from './modules/organization-article/organization-article.module';
import { OrganizationCustomUrlModule } from './modules/organization-custom-url/organization-custom-url.module';
import { OrganizationExpiredPackageModule } from './modules/organization-expired-package/organization-expired-package.module';
import { OrganizationFirstJobModule } from './modules/organization-first-job/organization-first-job.module';
import { OrganizationInsiderModule } from './modules/organization-insider/organization-insider.module';
import { OrganizationLeaderProfileModule } from './modules/organization-leader-profile/organization-leader-profile.module';
import { OrganizationLicenseVerifyModule } from './modules/organization-license-verify/organization-license-verify.module';
import { OrganizationMediaModule } from './modules/organization-media/organization-media.module';
import { OrganizationPackageModule } from './modules/organization-package/organization-package.module';
import { OrganizationPackageHistoryModule } from './modules/organization-package-history/organization-package-history.module';
import { OrganizationPackageLogModule } from './modules/organization-package-log/organization-package-log.module';
import { OrganizationPlatformModule } from './modules/organization-platform/organization-platform.module';
import { OrganizationRecruiterModule } from './modules/organization-recruiter/organization-recruiter.module';
import { OrganizationReviewModule } from './modules/organization-review/organization-review.module';
import { OrganizationReviewDetailModule } from './modules/organization-review-detail/organization-review-detail.module';
import { OrganizationReviewReactionModule } from './modules/organization-review-reaction/organization-review-reaction.module';
import { OrganizationSectionModule } from './modules/organization-section/organization-section.module';
import { OrganizationSimilarCompanyModule } from './modules/organization-similar-company/organization-similar-company.module';
import { OrganizationSizeModule } from './modules/organization-size/organization-size.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.ORGANIZATION_SERVICE_MONGODB_URL),
    HealthModule,
    OrganizationModule,
    OrganizationArticleModule,
    OrganizationCustomUrlModule,
    OrganizationExpiredPackageModule,
    OrganizationFirstJobModule,
    OrganizationInsiderModule,
    OrganizationLeaderProfileModule,
    OrganizationLicenseVerifyModule,
    OrganizationMediaModule,
    OrganizationPackageModule,
    OrganizationPackageHistoryModule,
    OrganizationPackageLogModule,
    OrganizationPlatformModule,
    OrganizationRecruiterModule,
    OrganizationReviewModule,
    OrganizationReviewDetailModule,
    OrganizationReviewReactionModule,
    OrganizationSectionModule,
    OrganizationSimilarCompanyModule,
    OrganizationSizeModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisCacheService],
})
export class AppModule { }
