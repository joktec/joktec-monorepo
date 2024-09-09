import { BaseService, Injectable } from '@joktec/core';
import { Connection } from '../../models/schemas';
import { ConnectionRepo } from '../../repositories';

@Injectable()
export class ConnectionService extends BaseService<Connection, string> {
  constructor(protected connectionRepo: ConnectionRepo) {
    super(connectionRepo);
  }
}
