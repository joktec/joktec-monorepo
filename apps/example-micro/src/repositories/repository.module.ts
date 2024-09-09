import { Global, Module } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { Repositories } from './index';

@Global()
@Module({
  imports: [MongoModule],
  providers: [...Repositories],
  exports: [...Repositories],
})
export class RepositoryModule {}
