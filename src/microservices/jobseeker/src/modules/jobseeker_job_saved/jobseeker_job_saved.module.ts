import { Module } from '@nestjs/common';
import { JobseekerJobSavedService } from './jobseeker_job_saved.service';
import { JobseekerJobSavedController } from './jobseeker_job_saved.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobSaved,
  JobseekerJobSavedSchema,
} from './schemas/jobseeker_job_saved.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobSaved.name, schema: JobseekerJobSavedSchema },
    ]),
  ],
  controllers: [JobseekerJobSavedController],
  providers: [JobseekerJobSavedService]
})
export class JobseekerJobSavedModule {}
