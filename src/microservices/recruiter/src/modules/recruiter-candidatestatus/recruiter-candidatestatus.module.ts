import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecruiterCandidatestatusService } from './recruiter-candidatestatus.service';
import { RecruiterCandidatestatusController } from './recruiter-candidatestatus.controller';
import {
  RecruiterCandidatestatus,
  RecruiterCandidatestatusSchema,
} from './schemas/recruiter-candidatestatus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecruiterCandidatestatus.name,
        schema: RecruiterCandidatestatusSchema,
      },
    ]),
  ],
  controllers: [RecruiterCandidatestatusController],
  providers: [RecruiterCandidatestatusService],
})
export class RecruiterCandidatestatusModule {}
