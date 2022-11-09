import { PageableRequest, PageableResponse } from './models';
import { Knex } from 'knex';

export interface MysqlClient {
  getKnex(conId?: string): Knex.Client;

  schema(conId?: string): Knex.SchemaBuilder;

  qb(table: string, conId?: string): Knex.QueryBuilder;

  exec<T>(qb: Knex.QueryBuilder): Promise<T | T[]>;
}

export interface MysqlRepoClient<T, ID> {
  findAll(req: PageableRequest): Promise<PageableResponse<T>>;

  count(req: PageableRequest): Promise<number>;

  findOne(id: ID): Promise<T>;

  insert(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
