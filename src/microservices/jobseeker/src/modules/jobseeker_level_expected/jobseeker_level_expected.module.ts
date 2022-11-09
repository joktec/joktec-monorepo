import { Module } from '@nestjs/common';
import { JobseekerLevelExpectedService } from './jobseeker_level_expected.service';
import { JobseekerLevelExpectedController } from './jobseeker_level_expected.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerLevelExpected,
  JobseekerLevelExpectedSchema,
} from './schemas/jobseeker_level_expected.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerLevelExpected.name, schema: JobseekerLevelExpectedSchema },
    ]),
  ],
  controllers: [JobseekerLevelExpectedController],
  providers: [JobseekerLevelExpectedService]
})
export class JobseekerLevelExpectedModule {}
