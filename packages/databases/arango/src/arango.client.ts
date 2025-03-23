import { Client } from '@joktec/core';
import { Database } from 'arangojs';
import { Cursor } from 'arangojs/cursors';
import { QueryOptions } from 'arangojs/queries';
import { ArangoConfig, CollectionImportOpts } from './arango.config';
import { ArangoQueryRequest } from './models';

export interface ArangoClient extends Client<ArangoConfig, Database> {
  query<T = any>(query: ArangoQueryRequest, options?: QueryOptions, conId?: string): Promise<Cursor<T>>;

  bulkUpsert(
    collection: string,
    data: { docs: any[]; upsertFields: Array<string> },
    options?: CollectionImportOpts,
    conId?: string,
  ): Promise<void>;
}
