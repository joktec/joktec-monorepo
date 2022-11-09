import { Module } from '@nestjs/common';
import { JobseekerWorkExperienceService } from './jobseeker_work_experience.service';
import { JobseekerWorkExperienceController } from './jobseeker_work_experience.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerWorkExperience,
  JobseekerWorkExperienceSchema,
} from './schemas/jobseeker_work_experience.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerWorkExperience.name, schema: JobseekerWorkExperienceSchema },
    ]),
  ],
  controllers: [JobseekerWorkExperienceController],
  providers: [JobseekerWorkExperienceService]
})
export class JobseekerWorkExperienceModule {}
