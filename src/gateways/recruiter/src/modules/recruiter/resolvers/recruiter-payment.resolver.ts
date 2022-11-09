import {
  RecruiterPaymentMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterPayment,
  RecruiterPaymentListReponse,
  RecruiterPaymentQueryInput,
  CreateRecruiterPaymentInput,
  UpdateRecruiterPaymentInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterPayment)
export class RecruiterPaymentResolver extends BaseResolver<
  CreateRecruiterPaymentInput,
  UpdateRecruiterPaymentInput,
  RecruiterPaymentQueryInput
>({
  viewDto: RecruiterPayment,
  createInput: CreateRecruiterPaymentInput,
  updateInput: UpdateRecruiterPaymentInput,
  listQueryInput: RecruiterPaymentQueryInput,
  listViewDto: RecruiterPaymentListReponse,
  name: 'recruiterPayment',
  pluralName: 'recruiterPayments',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterPaymentMessagePattern);
  }
}
