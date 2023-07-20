import { Client } from '@joktec/core';
import { Database } from 'arangojs';
import { CollectionImportOptions } from 'arangojs/collection';
import { ArrayCursor } from 'arangojs/cursor';
import { QueryOptions } from 'arangojs/database';
import { ArangoConfig } from './arango.config';
import { ArangoQueryRequest } from './models';

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
