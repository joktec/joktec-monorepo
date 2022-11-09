import { Module } from '@nestjs/common';
import { JobseekerJobFunctionService } from './jobseeker_job_function.service';
import { JobseekerJobFunctionController } from './jobseeker_job_function.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerJobFunction,
  JobseekerJobFunctionSchema,
} from './schemas/jobseeker_job_function.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerJobFunction.name, schema: JobseekerJobFunctionSchema },
    ]),
  ],
  controllers: [JobseekerJobFunctionController],
  providers: [JobseekerJobFunctionService]
})
export class JobseekerJobFunctionModule {}
