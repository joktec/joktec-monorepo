import { Module } from '@nestjs/common';
import { InterviewReviewService } from './interview-review.service';
import { InterviewReviewController } from './interview-review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReview, InterviewReviewSchema } from './schemas/interview-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReview.name, schema: InterviewReviewSchema }]),
  ],
  controllers: [InterviewReviewController],
  providers: [InterviewReviewService]
})
export class InterviewReviewModule {}
