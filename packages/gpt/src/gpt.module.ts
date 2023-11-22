import { Global, Module } from '@joktec/core';
import { GptService } from './gpt.service';

@Global()
@Module({
  imports: [],
  providers: [GptService],
  exports: [GptService],
})
export class GptModule {}
