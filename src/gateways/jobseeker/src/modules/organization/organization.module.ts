import { OrganizationMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationArticleResolver } from './resolvers/organization-article.resolver';
import { OrganizationCustomUrlResolver } from './resolvers/organization-custom-url.resolver';
import { OrganizationExpiredPackageResolver } from './resolvers/organization-expired-package.resolver';
import { OrganizationFirstJobResolver } from './resolvers/organization-first-job.resolver';
import { OrganizationInsiderResolver } from './resolvers/organization-insider.resolver';
import { OrganizationLeaderProfileResolver } from './resolvers/organization-leader-profile.resolver';
import { OrganizationLicenseVerifyResolver } from './resolvers/organization-license-verify.resolver';
import { OrganizationMediaResolver } from './resolvers/organization-media.resolver';
import { OrganizationPackageHistoryResolver } from './resolvers/organization-package-history.resolver';
import { OrganizationPackageLogResolver } from './resolvers/organization-package-log.resolver';
import { OrganizationPackageResolver } from './resolvers/organization-package.resolver';
import { OrganizationPlatformResolver } from './resolvers/organization-platform.resolver';
import { OrganizationRecruiterResolver } from './resolvers/organization-recruiter.resolver';
import { OrganizationReviewDetailResolver } from './resolvers/organization-review-detail.resolver';
import { OrganizationResolver } from './resolvers/organization.resolver';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: organizationMicroserviceConfig.name,
        ...organizationMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    OrganizationResolver,
    OrganizationArticleResolver,
    OrganizationCustomUrlResolver,
    OrganizationExpiredPackageResolver,
    OrganizationFirstJobResolver,
    OrganizationInsiderResolver,
    OrganizationLeaderProfileResolver,
    OrganizationLicenseVerifyResolver,
    OrganizationMediaResolver,
    OrganizationPackageHistoryResolver,
    OrganizationPackageLogResolver,
    OrganizationPackageResolver,
    OrganizationPlatformResolver,
    OrganizationRecruiterResolver,
    OrganizationReviewDetailResolver,
    OrganizationReviewDetailResolver,
    OrganizationReviewDetailResolver,
    OrganizationResolver,
    OrganizationMediaResolver,
    OrganizationResolver
  ],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
