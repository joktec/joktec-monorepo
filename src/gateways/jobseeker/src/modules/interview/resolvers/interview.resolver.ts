import {
  InterviewMessagePattern,
  InterviewMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateInterviewInput,
  UpdateInterviewInput,
  InterviewQueryInput,
  InterviewListReponse,
  Interview,
} from '@jobhopin/graphql';

const interviewMicroserviceConfig = new InterviewMicroserviceConfig();
@Resolver(() => Interview)
export class InterviewResolver extends BaseResolver<
  CreateInterviewInput,
  UpdateInterviewInput,
  InterviewQueryInput
>({
  viewDto: Interview,
  createInput: CreateInterviewInput,
  updateInput: UpdateInterviewInput,
  listQueryInput: InterviewQueryInput,
  listViewDto: InterviewListReponse,
  name: 'interview',
  pluralName: 'interviewes',
}) {
  constructor(
    @Inject(interviewMicroserviceConfig.name)
    private readonly interviewMicroservice: ClientProxy,
  ) {
    super(interviewMicroservice, InterviewMessagePattern);
  }
}
