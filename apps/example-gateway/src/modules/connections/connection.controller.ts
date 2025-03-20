import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Connection } from '../../models/schemas';
import { ConnectionService } from './connection.service';
import { ConnectionCreateDto } from './models';

const props: IControllerProps<Connection> = {
  dto: Connection,
  customDto: { createDto: ConnectionCreateDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('connections')
export class ConnectionController extends BaseController<Connection, string>(props) {
  constructor(protected connectionService: ConnectionService) {
    super(connectionService);
  }
}
