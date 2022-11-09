import {
  InterviewReviewReactionMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewReactionInput,
  UpdateInterviewReviewReactionInput,
  InterviewReviewReactionQueryInput,
  InterviewReviewReactionListReponse,
  InterviewReviewReaction,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReviewReaction)
export class InterviewReviewReactionResolver extends BaseResolver<
  CreateInterviewReviewReactionInput,
  UpdateInterviewReviewReactionInput,
  InterviewReviewReactionQueryInput
>({
  viewDto: InterviewReviewReaction,
  createInput: CreateInterviewReviewReactionInput,
  updateInput: UpdateInterviewReviewReactionInput,
  listQueryInput: InterviewReviewReactionQueryInput,
  listViewDto: InterviewReviewReactionListReponse,
  name: 'interviewReviewReaction',
  pluralName: 'interviewReviewReactions',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewReactionMessagePattern);
  }
}
