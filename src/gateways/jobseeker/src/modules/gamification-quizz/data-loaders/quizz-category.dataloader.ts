import {
  BaseDataLoader,
  QuizzCategoryMessagePattern,
  QuizzMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();
export class QuizzCategoryDataloader extends BaseDataLoader {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzCategoryMessagePattern);
  }
}
