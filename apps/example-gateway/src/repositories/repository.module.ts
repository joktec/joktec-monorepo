import { DEFAULT_CON_ID, Global, Module } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { MysqlModule } from '@joktec/mysql';
import { ENTITIES } from '../models/entities';
import { DataLog, SCHEMAS } from '../models/schemas';
import { Repositories } from './index';

@Global()
@Module({
  imports: [
    MongoModule.forRoot([
      { models: [...SCHEMAS], conId: DEFAULT_CON_ID },
      { models: [DataLog], conId: 'logConnection' },
    ]),
    MysqlModule.forRoot([{ models: [...ENTITIES], conId: DEFAULT_CON_ID }]),
  ],
  providers: [...Repositories],
  exports: [...Repositories],
})
export class RepositoryModule {}
