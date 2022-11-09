import {
  InterviewerMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewerInput,
  UpdateInterviewerInput,
  InterviewerQueryInput,
  InterviewerListReponse,
  Interviewer,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => Interviewer)
export class InterviewerResolver extends BaseResolver<
  CreateInterviewerInput,
  UpdateInterviewerInput,
  InterviewerQueryInput
>({
  viewDto: Interviewer,
  createInput: CreateInterviewerInput,
  updateInput: UpdateInterviewerInput,
  listQueryInput: InterviewerQueryInput,
  listViewDto: InterviewerListReponse,
  name: 'interviewer',
  pluralName: 'interviewers',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewerMessagePattern);
  }
}
