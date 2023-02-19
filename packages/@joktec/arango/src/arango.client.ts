import { Client } from '@joktec/core';
import { ArangoConfig } from './arango.config';
import { QueryOptions } from 'arangojs/database';
import { ArrayCursor } from 'arangojs/cursor';
import { CollectionImportOptions } from 'arangojs/collection';
import { ArangoQueryRequest } from './models';
import { Database } from 'arangojs';

export interface ArangoClient extends Client<ArangoConfig, Database> {
  query(query: ArangoQueryRequest, options?: QueryOptions, conId?: string): Promise<ArrayCursor>;

  bulkUpsert(
    collection: string,
    data: {
      docs: any[];
      upsertFields: Array<string>;
    },
    options?: CollectionImportOptions,
    conId?: string,
  ): Promise<void>;
}
