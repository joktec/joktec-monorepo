import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CandidateAttachModule } from './modules/candidate-attach/candidate-attach.module';
import { CandidateCompanyTypeModule } from './modules/candidate-company-type/candidate-company-type.module';
import { CandidateFeedbackGroupModule } from './modules/candidate-feedback-group/candidate-feedback-group.module';
import { CandidateFeedbackGroupContentModule } from './modules/candidate-feedback-group-content/candidate-feedback-group-content.module';
import { CandidateFeedbackItemModule } from './modules/candidate-feedback-item/candidate-feedback-item.module';
import { CandidateFeedbackItemContentModule } from './modules/candidate-feedback-item-content/candidate-feedback-item-content.module';
import { CandidateFunctionModule } from './modules/candidate-function/candidate-function.module';
import { CandidateIndustryModule } from './modules/candidate-industry/candidate-industry.module';
import { CandidateLinkModule } from './modules/candidate-link/candidate-link.module';
import { CandidateLocationModule } from './modules/candidate-location/candidate-location.module';
import { CandidatePerferenceHistoryModule } from './modules/candidate-perference-history/candidate-perference-history.module';
import { CandidateThumbdownCountModule } from './modules/candidate-thumbdown-count/candidate-thumbdown-count.module';
@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.CANDIDATE_SERVICE_MONGODB_URL),
    HealthModule,
    CandidateModule,
    CandidateAttachModule,
    CandidateCompanyTypeModule,
    CandidateFeedbackGroupModule,
    CandidateFeedbackGroupContentModule,
    CandidateFeedbackItemModule,
    CandidateFeedbackItemContentModule,
    CandidateFunctionModule,
    CandidateIndustryModule,
    CandidateLinkModule,
    CandidateLocationModule,
    CandidatePerferenceHistoryModule,
    CandidateThumbdownCountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
