import { Module } from '@nestjs/common';
import { JobseekerCareerInterestCardService } from './jobseeker_career_interest_card.service';
import { JobseekerCareerInterestCardController } from './jobseeker_career_interest_card.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerCareerInterestCard,
  JobseekerCareerInterestCardSchema,
} from './schemas/jobseeker_career_interest_card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerCareerInterestCard.name, schema: JobseekerCareerInterestCardSchema },
    ]),
  ],
  controllers: [JobseekerCareerInterestCardController],
  providers: [JobseekerCareerInterestCardService]
})
export class JobseekerCareerInterestCardModule {}
