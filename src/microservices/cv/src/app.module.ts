import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './modules/cv/cv.module';
import { CvAttachModule } from './modules/cv-attach/cv-attach.module';
import { CvFeedbackModule } from './modules/cv-feedback/cv-feedback.module';
import { CvHistoryModule } from './modules/cv-history/cv-history.module';
import { CvIndustryModule } from './modules/cv-industry/cv-industry.module';
import { CvLinkModule } from './modules/cv-link/cv-link.module';
import { CvMailboxModule } from './modules/cv-mailbox/cv-mailbox.module';
import { CvScoreModule } from './modules/cv-score/cv-score.module';
import { CvSkillModule } from './modules/cv-skill/cv-skill.module';
import { CvTagModule } from './modules/cv-tag/cv-tag.module';
import { CvTemplatesModule } from './modules/cv-templates/cv-templates.module';
import { CvAnalysicFlowModule } from './modules/cv-analysic-flow/cv-analysic-flow.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CV_SERVICE_MONGODB_URL),
    HealthModule,
    CvModule,
    CvAnalysicFlowModule,
    CvAttachModule,
    CvFeedbackModule,
    CvHistoryModule,
    CvIndustryModule,
    CvLinkModule,
    CvMailboxModule,
    CvScoreModule,
    CvSkillModule,
    CvTagModule,
    CvTemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
