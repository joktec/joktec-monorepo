import { Module } from '@nestjs/common';
import { JobseekerMatchscoreService } from './jobseeker_matchscore.service';
import { JobseekerMatchscoreController } from './jobseeker_matchscore.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerMatchscore,
  JobseekerMatchscoreSchema,
} from './schemas/jobseeker_matchscore.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerMatchscore.name, schema: JobseekerMatchscoreSchema },
    ]),
  ],
  controllers: [JobseekerMatchscoreController],
  providers: [JobseekerMatchscoreService]
})
export class JobseekerMatchscoreModule {}
