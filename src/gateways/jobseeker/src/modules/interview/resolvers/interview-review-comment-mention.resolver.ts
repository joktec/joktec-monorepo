import {
  InterviewReviewCommentMentionMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewReviewCommentMentionInput,
  UpdateInterviewReviewCommentMentionInput,
  InterviewReviewCommentMentionQueryInput,
  InterviewReviewCommentMentionListReponse,
  InterviewReviewCommentMention,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewReviewCommentMention)
export class InterviewReviewCommentMentionResolver extends BaseResolver<
  CreateInterviewReviewCommentMentionInput,
  UpdateInterviewReviewCommentMentionInput,
  InterviewReviewCommentMentionQueryInput
>({
  viewDto: InterviewReviewCommentMention,
  createInput: CreateInterviewReviewCommentMentionInput,
  updateInput: UpdateInterviewReviewCommentMentionInput,
  listQueryInput: InterviewReviewCommentMentionQueryInput,
  listViewDto: InterviewReviewCommentMentionListReponse,
  name: 'interviewReviewCommentMention',
  pluralName: 'interviewReviewCommentMentions',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewReviewCommentMentionMessagePattern);
  }
}
