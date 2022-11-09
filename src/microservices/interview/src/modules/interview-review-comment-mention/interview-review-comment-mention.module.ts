import { Module } from '@nestjs/common';
import { InterviewReviewCommentMentionService } from './interview-review-comment-mention.service';
import { InterviewReviewCommentMentionController } from './interview-review-comment-mention.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReviewCommentMention, InterviewReviewCommentMentionSchema } from './schemas/interview-review-comment-mention.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReviewCommentMention.name, schema: InterviewReviewCommentMentionSchema }]),
  ],
  controllers: [InterviewReviewCommentMentionController],
  providers: [InterviewReviewCommentMentionService]
})
export class InterviewReviewCommentMentionModule {}
