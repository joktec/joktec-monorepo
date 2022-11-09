import { Module } from '@nestjs/common';
import { InterviewReviewQuestionService } from './interview-review-question.service';
import { InterviewReviewQuestionController } from './interview-review-question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReviewQuestion, InterviewReviewQuestionSchema } from './schemas/interview-review-question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReviewQuestion.name, schema: InterviewReviewQuestionSchema }]),
  ],
  controllers: [InterviewReviewQuestionController],
  providers: [InterviewReviewQuestionService]
})
export class InterviewReviewQuestionModule {}
