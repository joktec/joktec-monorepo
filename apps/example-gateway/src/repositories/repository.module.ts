import { DEFAULT_CON_ID, Global, Module } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { DataLog, SCHEMAS } from '../models/schemas';
import { Repositories } from './index';

@Global()
@Module({
  imports: [
    MongoModule.forRoot([
      { models: [...SCHEMAS], conId: DEFAULT_CON_ID },
      { models: [DataLog], conId: 'logConnection' },
    ]),
  ],
  providers: [...Repositories],
  exports: [...Repositories],
})
export class RepositoryModule {}
