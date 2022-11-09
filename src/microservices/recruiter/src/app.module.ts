import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruiterModule } from './modules/recruiter/recruiter.module';
import { RecruiterActivityModule } from './modules/recruiter-activity/recruiter-activity.module';
import { RecruiterCandidatestatusModule } from './modules/recruiter-candidatestatus/recruiter-candidatestatus.module';
import { RecruiterCandidatestatusmessageModule } from './modules/recruiter-candidatestatusmessage/recruiter-candidatestatusmessage.module';
import { RecruiterContactModule } from './modules/recruiter-contact/recruiter-contact.module';
import { RecruiterFirstActivityDateModule } from './modules/recruiter-first-activity-date/recruiter-first-activity-date.module';
import { RecruiterJobjmcreditModule } from './modules/recruiter-jobjmcredit/recruiter-jobjmcredit.module';
import { RecruiterJobjmcreditlogModule } from './modules/recruiter-jobjmcreditlog/recruiter-jobjmcreditlog.module';
import { RecruiterJobjmcreditplanModule } from './modules/recruiter-jobjmcreditplan/recruiter-jobjmcreditplan.module';
import { RecruiterLastActivityDateModule } from './modules/recruiter-last-activity-date/recruiter-last-activity-date.module';
import { RecruiterPaymentModule } from './modules/recruiter-payment/recruiter-payment.module';
import { RBannerModule } from './modules/r-banner/r-banner.module';
import { RBannerActionModule } from './modules/r-banner-action/r-banner-action.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.RECRUITER_SERVICE_MONGODB_URL),
    HealthModule,
    RecruiterModule,
    RecruiterActivityModule,
    RecruiterCandidatestatusModule,
    RecruiterCandidatestatusmessageModule,
    RecruiterContactModule,
    RecruiterFirstActivityDateModule,
    RecruiterJobjmcreditModule,
    RecruiterJobjmcreditlogModule,
    RecruiterJobjmcreditplanModule,
    RecruiterLastActivityDateModule,
    RecruiterPaymentModule,
    RBannerModule,
    RBannerActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
