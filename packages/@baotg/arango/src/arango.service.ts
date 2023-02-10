import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@baotg/core';
import { pick, values } from 'lodash';
import { ArangoConfig, CollectionImportOpts } from './arango.config';
import { ArangoClient } from './arango.client';
import { QueryOptions } from 'arangojs/database';
import { ArrayCursor } from 'arangojs/cursor';
import { ArangoQueryException, ArangoImportException } from './arango.exception';
import { ArangoQueryRequest } from './models';
import { Database } from 'arangojs';

@Injectable()
export class ArangoService extends AbstractClientService<ArangoConfig, Database> implements ArangoClient {
  constructor() {
    super('arango', ArangoConfig);
  }

  async init(config: ArangoConfig): Promise<Database> {
    return new Database(config);
  }

  async start(client: Database, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  async stop(client: Database, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Nothing
  }

  getCollection(col: string, conId: string = DEFAULT_CON_ID) {
    return this.getClient(conId).collection(col);
  }

  private getUpsertKey(doc: any, upsertFields: Array<string>): string {
    if (doc?._key) {
      return doc?._key;
    }
    return values(pick(doc, upsertFields)).join('_');
  }

  async bulkUpsert(
    col: string,
    data: {
      docs: any[];
      upsertFields: Array<string>;
    },
    opts: CollectionImportOpts = { onDuplicate: 'update' },
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    try {
      const { docs, upsertFields } = data;
      if (upsertFields?.length) {
        docs?.map(doc => ({ ...doc, _key: this.getUpsertKey(doc, upsertFields) }));
      }
      const result = await this.getCollection(col, conId).import(docs, opts);
      this.logService.debug(result, 'import to `%s` collection success with data:\n %j', col, docs);
    } catch (ex) {
      this.logService.error(ex, 'import to `%s` collection failed', col);
      throw new ArangoImportException(`collection: ${col} - ${ex.message}`, ex);
    }
  }

  async query(q: ArangoQueryRequest, opts?: QueryOptions, conId: string = DEFAULT_CON_ID): Promise<ArrayCursor> {
    try {
      const result = await this.getClient(conId).query(q, opts);
      this.logService.debug(result, 'query success with aql:\n %j', q);
      return result;
    } catch (ex) {
      this.logService.error(ex, `Query fail with aql:\n %j`, q);
      throw new ArangoQueryException(`${ex.message}`, ex);
    }
  }
}
