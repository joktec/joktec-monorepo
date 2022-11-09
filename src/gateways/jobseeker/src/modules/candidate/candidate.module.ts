import { CandidateMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateAttachResolver } from './resolvers/candidate-attach.resolver';
import { CandidateCompanyTypeResolver } from './resolvers/candidate-company-type.resolver';
import { CandidateFeedbackGroupContentResolver } from './resolvers/candidate-feedback-group-content.resolver';
import { CandidateFeedbackGroupResolver } from './resolvers/candidate-feedback-group.resolver';
import { CandidateFeedbackItemContentResolver } from './resolvers/candidate-feedback-item-content.resolver';
import { CandidateFeedbackItemResolver } from './resolvers/candidate-feedback-item.resolver';
import { CandidateFunctionResolver } from './resolvers/candidate-function.resolver';
import { CandidateIndustryResolver } from './resolvers/candidate-industry.resolver';
import { CandidateLinkResolver } from './resolvers/candidate-link.resolver';
import { CandidateLocationResolver } from './resolvers/candidate-location.resolver';
import { CandidatePerferenceHistoryResolver } from './resolvers/candidate-perference-history.resolver';
import { CandidateThumbdownCountResolver } from './resolvers/candidate-thumbdown-count.resolver';
import { CandidateResolver } from './resolvers/candidate.resolver';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: candidateMicroserviceConfig.name,
        ...candidateMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  controllers: [CandidateController],
  providers: [
    CandidateResolver,
    CandidateAttachResolver,
    CandidateCompanyTypeResolver,
    CandidateFeedbackGroupResolver,
    CandidateFeedbackGroupContentResolver,
    CandidateFeedbackItemResolver,
    CandidateFeedbackItemContentResolver,
    CandidateFunctionResolver,
    CandidateIndustryResolver,
    CandidateLinkResolver,
    CandidateLocationResolver,
    CandidatePerferenceHistoryResolver,
    CandidateThumbdownCountResolver
  ],
})
export class CandidateModule { }
