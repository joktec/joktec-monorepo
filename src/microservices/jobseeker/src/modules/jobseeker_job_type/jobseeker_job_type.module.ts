import { Module } from '@nestjs/common';
import { JobseekerJobTypeService } from './jobseeker_job_type.service';
import { JobseekerJobTypeController } from './jobseeker_job_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobType,
  JobseekerJobTypeSchema,
} from './schemas/jobseeker_job_type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobType.name, schema: JobseekerJobTypeSchema },
    ]),
  ],
  controllers: [JobseekerJobTypeController],
  providers: [JobseekerJobTypeService]
})
export class JobseekerJobTypeModule {}
