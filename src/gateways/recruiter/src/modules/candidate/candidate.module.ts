import {
  CandidateMicroserviceConfig,
  CommonMicroserviceConfig,
  CvMicroserviceConfig,
  UserMicroserviceConfig,
} from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateFeedbackItemResolver } from './resolvers/candidate-feedback-item.resolver';
import { CandidateFeedbackResolver } from './resolvers/candidate-feedback.resolver';
import { CandidateResolver } from './resolvers/candidate.resolver';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
const cvMicroserviceConfig = new CvMicroserviceConfig();
const commonMicroserviceConfig = new CommonMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: candidateMicroserviceConfig.name,
        ...candidateMicroserviceConfig.microserviceOptions,
      },
      {
        name: cvMicroserviceConfig.name,
        ...cvMicroserviceConfig.microserviceOptions,
      },
      {
        name: commonMicroserviceConfig.name,
        ...commonMicroserviceConfig.microserviceOptions,
      },
      {
        name: userMicroserviceConfig.name,
        ...userMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    CandidateResolver,
    CandidateFeedbackResolver,
    CandidateFeedbackItemResolver,
  ],
  controllers: [CandidateController],
  exports: [],
})
export class CandidateModule {}
