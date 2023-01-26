import { Knex } from 'knex';
import { PageableRequest, PageableResponse } from './models';

export interface MysqlClient {
  getKnex(conId?: string): Knex;

  getSlaveKnex(node?: string, conId?: string): Knex;

  exec<T>(qb: Knex.QueryBuilder): Promise<T | T[]>;
}

export interface MysqlReadRepoClient<T, ID> {
  findAll(req: PageableRequest): Promise<PageableResponse<T>>;

  count(req: PageableRequest): Promise<number>;

  findOne(id: ID): Promise<T | null>;

  findMany(ids: ID[]): Promise<T[]>;
}

export interface MysqlWriteRepoClient<T, ID> {
  insert(entity: T): Promise<T>;

  update(id: ID, entity: T): Promise<T>;

  updateFields(id: ID, updatedValue: object): Promise<void>;

  delete(ids: ID | ID[]): Promise<number>;
}
