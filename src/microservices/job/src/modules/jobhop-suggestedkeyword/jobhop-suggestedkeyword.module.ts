import {
  JobhopSuggestedKeyword,
  JobhopSuggestedKeywordSchema,
} from './schemas/jobhop-suggestedkeyword.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopSuggestedKeywordService } from './jobhop-suggestedkeyword.service';
import { JobhopSuggestedKeywordController } from './jobhop-suggestedkeyword.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopSuggestedKeyword.name,
        schema: JobhopSuggestedKeywordSchema,
      },
    ]),
  ],
  controllers: [JobhopSuggestedKeywordController],
  providers: [JobhopSuggestedKeywordService],
})
export class JobhopSuggestedKeywordModule {}
