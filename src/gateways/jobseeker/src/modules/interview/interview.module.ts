import { InterviewMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { InterviewFeedbackResolver } from './resolvers/interview-feedback.resolver';
import { InterviewReviewCommentMentionResolver } from './resolvers/interview-review-comment-mention.resolver';
import { InterviewReviewCommentResolver } from './resolvers/interview-review-comment.resolver';
import { InterviewReviewQuestionAnswerResolver } from './resolvers/interview-review-question-answer.resolver';
import { InterviewReviewQuestionResolver } from './resolvers/interview-review-question.resolver';
import { InterviewReviewReactionResolver } from './resolvers/interview-review-reaction.resolver';
import { InterviewReviewResolver } from './resolvers/interview-review.resolver';
import { InterviewResolver } from './resolvers/interview.resolver';
import { InterviewerResolver } from './resolvers/interviewer.resolver';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: interviewMicroserviceConfig.name,
        ...interviewMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    InterviewResolver,
    InterviewFeedbackResolver,
    InterviewReviewResolver,
    InterviewReviewCommentResolver,
    InterviewReviewCommentMentionResolver,
    InterviewReviewQuestionResolver,
    InterviewReviewQuestionAnswerResolver,
    InterviewReviewReactionResolver,
    InterviewerResolver,
  ],
  controllers: [],
})
export class InterviewModule {}
