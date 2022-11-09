import {
  InterviewReviewQuestionMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewQuestionInput,
  UpdateInterviewReviewQuestionInput,
  InterviewReviewQuestionQueryInput,
  InterviewReviewQuestionListReponse,
  InterviewReviewQuestion,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReviewQuestion)
export class InterviewReviewQuestionResolver extends BaseResolver<
  CreateInterviewReviewQuestionInput,
  UpdateInterviewReviewQuestionInput,
  InterviewReviewQuestionQueryInput
>({
  viewDto: InterviewReviewQuestion,
  createInput: CreateInterviewReviewQuestionInput,
  updateInput: UpdateInterviewReviewQuestionInput,
  listQueryInput: InterviewReviewQuestionQueryInput,
  listViewDto: InterviewReviewQuestionListReponse,
  name: 'interviewReviewQuestion',
  pluralName: 'interviewReviewQuestions',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewQuestionMessagePattern);
  }
}
