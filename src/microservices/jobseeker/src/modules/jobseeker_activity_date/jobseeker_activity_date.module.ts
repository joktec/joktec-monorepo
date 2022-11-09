import { Module } from '@nestjs/common';
import { JobseekerActivityDateService } from './jobseeker_activity_date.service';
import { JobseekerActivityDateController } from './jobseeker_activity_date.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerActivityDate,
  JobseekerActivityDateSchema,
} from './schemas/jobseeker_activity_date.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerActivityDate.name, schema: JobseekerActivityDateSchema },
    ]),
  ],
  controllers: [JobseekerActivityDateController],
  providers: [JobseekerActivityDateService]
})
export class JobseekerActivityDateModule {}
