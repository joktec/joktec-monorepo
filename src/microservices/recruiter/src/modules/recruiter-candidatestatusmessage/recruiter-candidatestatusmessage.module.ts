import {
  RecruiterCandidatestatusmessage,
  RecruiterCandidatestatusmessageSchema,
} from './schemas/recruiter-candidatestatusmessage.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterCandidatestatusmessageService } from './recruiter-candidatestatusmessage.service';
import { RecruiterCandidatestatusmessageController } from './recruiter-candidatestatusmessage.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterCandidatestatusmessage.name,
        schema: RecruiterCandidatestatusmessageSchema,
      },
    ]),
  ],
  controllers: [RecruiterCandidatestatusmessageController],
  providers: [RecruiterCandidatestatusmessageService],
})
export class RecruiterCandidatestatusmessageModule {}
