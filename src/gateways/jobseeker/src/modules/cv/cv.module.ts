import { CvMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CvAnalysicFlowResolver } from './resolvers/cv-analysic-flow.resolver';
import { CvAttachResolver } from './resolvers/cv-attach.resolver';
import { CvFeedbackResolver } from './resolvers/cv-feedback.resolver';
import { CvHistoryResolver } from './resolvers/cv-history.resolver';
import { CvIndustryResolver } from './resolvers/cv-industry.resolver';
import { CvLinkResolver } from './resolvers/cv-link.resolver';
import { CvMailBoxResolver } from './resolvers/cv-mailbox.resolver';
import { CvScoreResolver } from './resolvers/cv-score.resolver';
import { CvSkillResolver } from './resolvers/cv-skill.resolver';
import { CvTagResolver } from './resolvers/cv-tag.resolver';
import { CvTemplateResolver } from './resolvers/cv-template.resolver';
import { CvResolver } from './resolvers/cv.resolver';

const cvMicroserviceConfig = new CvMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: cvMicroserviceConfig.name,
        ...cvMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    CvResolver,
    CvAnalysicFlowResolver,
    CvAttachResolver,
    CvFeedbackResolver,
    CvHistoryResolver,
    CvIndustryResolver,
    CvLinkResolver,
    CvMailBoxResolver,
    CvScoreResolver,
    CvSkillResolver,
    CvTagResolver,
    CvTemplateResolver,
  ],
  controllers: [],
})
export class CvModule {}
