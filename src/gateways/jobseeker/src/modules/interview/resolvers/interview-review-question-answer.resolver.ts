import {
  InterviewReviewQuestionAnswerMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewQuestionAnswerInput,
  UpdateInterviewReviewQuestionAnswerInput,
  InterviewReviewQuestionAnswerQueryInput,
  InterviewReviewQuestionAnswerListReponse,
  InterviewReviewQuestionAnswer,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReviewQuestionAnswer)
export class InterviewReviewQuestionAnswerResolver extends BaseResolver<
  CreateInterviewReviewQuestionAnswerInput,
  UpdateInterviewReviewQuestionAnswerInput,
  InterviewReviewQuestionAnswerQueryInput
>({
  viewDto: InterviewReviewQuestionAnswer,
  createInput: CreateInterviewReviewQuestionAnswerInput,
  updateInput: UpdateInterviewReviewQuestionAnswerInput,
  listQueryInput: InterviewReviewQuestionAnswerQueryInput,
  listViewDto: InterviewReviewQuestionAnswerListReponse,
  name: 'interviewReviewQuestionAnswer',
  pluralName: 'interviewReviewQuestionAnswers',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewQuestionAnswerMessagePattern);
  }
}
