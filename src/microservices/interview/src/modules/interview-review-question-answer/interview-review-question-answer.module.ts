import { Module } from '@nestjs/common';
import { InterviewReviewQuestionAnswerService } from './interview-review-question-answer.service';
import { InterviewReviewQuestionAnswerController } from './interview-review-question-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewReviewQuestionAnswer, InterviewReviewQuestionAnswerSchema } from './schemas/interview-review-question-answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewReviewQuestionAnswer.name, schema: InterviewReviewQuestionAnswerSchema }]),
  ],
  controllers: [InterviewReviewQuestionAnswerController],
  providers: [InterviewReviewQuestionAnswerService]
})
export class InterviewReviewQuestionAnswerModule {}
