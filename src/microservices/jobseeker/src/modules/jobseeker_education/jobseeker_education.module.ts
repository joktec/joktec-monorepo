import { Module } from '@nestjs/common';
import { JobseekerEducationService } from './jobseeker_education.service';
import { JobseekerEducationController } from './jobseeker_education.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerEducation,
  JobseekerEducationSchema,
} from './schemas/jobseeker_education.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerEducation.name, schema: JobseekerEducationSchema },
    ]),
  ],
  controllers: [JobseekerEducationController],
  providers: [JobseekerEducationService]
})
export class JobseekerEducationModule {}
