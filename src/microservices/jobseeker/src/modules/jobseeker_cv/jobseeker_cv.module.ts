import { Module } from '@nestjs/common';
import { JobseekerCvService } from './jobseeker_cv.service';
import { JobseekerCvController } from './jobseeker_cv.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerCv,
  JobseekerCvSchema,
} from './schemas/jobseeker_cv.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerCv.name, schema: JobseekerCvSchema },
    ]),
  ],
  controllers: [JobseekerCvController],
  providers: [JobseekerCvService]
})
export class JobseekerCvModule {}
