import { Global, Module } from '@joktec/core';
import { Repositories } from '../modules';

@Global()
@Module({
  imports: [],
  providers: [...Repositories],
  exports: [...Repositories],
})
export class RepositoryModule {}
