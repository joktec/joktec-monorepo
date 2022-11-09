import { Module } from '@nestjs/common';
import { InterviewReviewReactionService } from './interview-review-reaction.service';
import { InterviewReviewReactionController } from './interview-review-reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReviewReaction, InterviewReviewReactionSchema } from './schemas/interview-review-reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReviewReaction.name, schema: InterviewReviewReactionSchema }]),
  ],
  controllers: [InterviewReviewReactionController],
  providers: [InterviewReviewReactionService]
})
export class InterviewReviewReactionModule {}
