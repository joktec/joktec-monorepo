import {
  InterviewReviewCommentMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewCommentInput,
  UpdateInterviewReviewCommentInput,
  InterviewReviewCommentQueryInput,
  InterviewReviewCommentListReponse,
  InterviewReviewComment,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReviewComment)
export class InterviewReviewCommentResolver extends BaseResolver<
  CreateInterviewReviewCommentInput,
  UpdateInterviewReviewCommentInput,
  InterviewReviewCommentQueryInput
>({
  viewDto: InterviewReviewComment,
  createInput: CreateInterviewReviewCommentInput,
  updateInput: UpdateInterviewReviewCommentInput,
  listQueryInput: InterviewReviewCommentQueryInput,
  listViewDto: InterviewReviewCommentListReponse,
  name: 'interviewReviewComment',
  pluralName: 'interviewReviewComments',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewCommentMessagePattern);
  }
}
