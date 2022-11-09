import { Module } from '@nestjs/common';
import { JobseekerAwardService } from './jobseeker_award.service';
import { JobseekerAwardController } from './jobseeker_award.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerAward,
  JobseekerAwardSchema,
} from './schemas/jobseeker_award.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerAward.name, schema: JobseekerAwardSchema },
    ]),
  ],
  controllers: [JobseekerAwardController],
  providers: [JobseekerAwardService]
})
export class JobseekerAwardModule {}
