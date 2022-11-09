import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from './modules/interview/interview.module';
import { InterviewFeedbackModule } from './modules/interview-feedback/interview-feedback.module';
import { InterviewReviewModule } from './modules/interview-review/interview-review.module';
import { InterviewReviewCommentModule } from './modules/interview-review-comment/interview-review-comment.module';
import { InterviewReviewCommentMentionModule } from './modules/interview-review-comment-mention/interview-review-comment-mention.module';
import { InterviewReviewQuestionModule } from './modules/interview-review-question/interview-review-question.module';
import { InterviewReviewQuestionAnswerModule } from './modules/interview-review-question-answer/interview-review-question-answer.module';
import { InterviewReviewReactionModule } from './modules/interview-review-reaction/interview-review-reaction.module';
import { InterviewerModule } from './modules/interviewer/interviewer.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.INTERVIEW_SERVICE_MONGODB_URL),
    HealthModule,
    InterviewModule,
    InterviewFeedbackModule,
    InterviewReviewModule,
    InterviewReviewCommentModule,
    InterviewReviewCommentMentionModule,
    InterviewReviewQuestionModule,
    InterviewReviewQuestionAnswerModule,
    InterviewReviewReactionModule,
    InterviewerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
