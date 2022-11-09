import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobScoreService } from './job-score.service';
import { JobScoreController } from './job-score.controller';
import { JobScore, JobScoreSchema } from './schemas/job-score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobScore.name,
        schema: JobScoreSchema,
      },
    ]),
  ],
  controllers: [JobScoreController],
  providers: [JobScoreService],
})
export class JobScoreModule {}
