import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import { ClientsModule } from '@nestjs/microservices';
import {
  CommonMicroserviceConfig,
  JobMicroserviceConfig,
  RecruiterMicroserviceConfig,
  UserMicroserviceConfig,
} from '@jobhopin/core';

const jobMicroserviceConfig = new JobMicroserviceConfig();
const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();
const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
    ClientsModule.register([
      {
        name: jobMicroserviceConfig.name,
        ...jobMicroserviceConfig.microserviceOptions,
      },
      {
        name: recruiterMicroserviceConfig.name,
        ...recruiterMicroserviceConfig.microserviceOptions,
      },
      {
        name: userMicroserviceConfig.name,
        ...userMicroserviceConfig.microserviceOptions,
      },
      {
        name: commonMicroserviceConfig.name,
        ...commonMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
