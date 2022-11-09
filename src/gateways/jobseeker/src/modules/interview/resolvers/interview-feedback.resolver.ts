import {
  InterviewFeedbackMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewFeedbackInput,
  UpdateInterviewFeedbackInput,
  InterviewFeedbackQueryInput,
  InterviewFeedbackListReponse,
  InterviewFeedback,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => InterviewFeedback)
export class InterviewFeedbackResolver extends BaseResolver<
  CreateInterviewFeedbackInput,
  UpdateInterviewFeedbackInput,
  InterviewFeedbackQueryInput
>({
  viewDto: InterviewFeedback,
  createInput: CreateInterviewFeedbackInput,
  updateInput: UpdateInterviewFeedbackInput,
  listQueryInput: InterviewFeedbackQueryInput,
  listViewDto: InterviewFeedbackListReponse,
  name: 'interviewFeedback',
  pluralName: 'interviewFeedbacks',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewFeedbackMessagePattern);
  }
}
