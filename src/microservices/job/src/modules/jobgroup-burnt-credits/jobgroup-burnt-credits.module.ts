import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobGroupBurntCreditsService } from './jobgroup-burnt-credits.service';
import { JobGroupBurntCreditsController } from './jobgroup-burnt-credits.controller';
import {
  JobGroupBurntCredits,
  JobGroupBurntCreditsSchema,
} from './schemas/jobgroup-burnt-credits.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobGroupBurntCredits.name,
        schema: JobGroupBurntCreditsSchema,
      },
    ]),
  ],
  controllers: [JobGroupBurntCreditsController],
  providers: [JobGroupBurntCreditsService],
})
export class JobGroupBurntCreditsModule {}
