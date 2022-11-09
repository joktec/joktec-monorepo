import { Module } from '@nestjs/common';
import { JobseekerTitlecaseService } from './jobseeker_titlecase.service';
import { JobseekerTitlecaseController } from './jobseeker_titlecase.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerTitlecase,
  JobseekerTitlecaseSchema,
} from './schemas/jobseeker_titlecase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerTitlecase.name, schema: JobseekerTitlecaseSchema },
    ]),
  ],
  controllers: [JobseekerTitlecaseController],
  providers: [JobseekerTitlecaseService]
})
export class JobseekerTitlecaseModule {}
