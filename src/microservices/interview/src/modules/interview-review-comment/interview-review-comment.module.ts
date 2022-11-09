import { Module } from '@nestjs/common';
import { InterviewReviewCommentService } from './interview-review-comment.service';
import { InterviewReviewCommentController } from './interview-review-comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReviewComment, InterviewReviewCommentSchema } from './schemas/interview-review-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReviewComment.name, schema: InterviewReviewCommentSchema }]),
  ],
  controllers: [InterviewReviewCommentController],
  providers: [InterviewReviewCommentService]
})
export class InterviewReviewCommentModule {}
