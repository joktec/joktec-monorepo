import { RecruiterMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RBannerActionResolver } from './resolvers/r-banner-action.resolver';
import { RBannerResolver } from './resolvers/r-banner.resolver';
import { RecruiterResolver } from './resolvers/recruiter.resolver';
import { RecruiterCandidatestatusResolver } from './resolvers/recruiter-candidatestatus.resolver';
import { RecruiterCandidatestatusmessageResolver } from './resolvers/recruiter-candidatestatusmessage.resolver';
import { RecruiterContactResolver } from './resolvers/recruiter-contact.resolver';
import { RecruiterFirstActivityDateResolver } from './resolvers/recruiter-first-activity-date.resolver';
import { RecruiterJobjmcreditResolver } from './resolvers/recruiter-jobjmcredit.resolver';
import { RecruiterJobjmcreditlogResolver } from './resolvers/recruiter-jobjmcreditlog.resolver';
import { RecruiterJobjmcreditplanResolver } from './resolvers/recruiter-jobjmcreditplan.resolver';
import { RecruiterLastActivityDateResolver } from './resolvers/recruiter-last-activity-date.resolver';
import { RecruiterPaymentResolver } from './resolvers/recruiter-payment.resolver';
import { RecruiterActivityResolver } from './resolvers/recruiter-activity.resolver';
import { GoogleAPIModule } from '../google-api/google-api.module';
import { RecruiterGoogleSheetResolver } from './resolvers/recruiter-google-sheet.resolver';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: recruiterMicroserviceConfig.name,
        ...recruiterMicroserviceConfig.microserviceOptions,
      },
    ]),
    GoogleAPIModule,
  ],
  providers: [
    RecruiterResolver,
    RBannerActionResolver,
    RBannerResolver,
    RecruiterActivityResolver,
    RecruiterCandidatestatusResolver,
    RecruiterCandidatestatusmessageResolver,
    RecruiterContactResolver,
    RecruiterFirstActivityDateResolver,
    RecruiterJobjmcreditResolver,
    RecruiterJobjmcreditlogResolver,
    RecruiterJobjmcreditplanResolver,
    RecruiterLastActivityDateResolver,
    RecruiterPaymentResolver,
    RecruiterGoogleSheetResolver,
  ],
  controllers: [],
})
export class RecruiterModule {}
