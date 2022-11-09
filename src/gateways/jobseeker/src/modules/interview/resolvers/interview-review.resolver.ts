import {
  InterviewReviewMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewInput,
  UpdateInterviewReviewInput,
  InterviewReviewQueryInput,
  InterviewReviewListReponse,
  InterviewReview,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReview)
export class InterviewReviewResolver extends BaseResolver<
  CreateInterviewReviewInput,
  UpdateInterviewReviewInput,
  InterviewReviewQueryInput
>({
  viewDto: InterviewReview,
  createInput: CreateInterviewReviewInput,
  updateInput: UpdateInterviewReviewInput,
  listQueryInput: InterviewReviewQueryInput,
  listViewDto: InterviewReviewListReponse,
  name: 'interviewReview',
  pluralName: 'interviewReviews',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewMessagePattern);
  }
}
