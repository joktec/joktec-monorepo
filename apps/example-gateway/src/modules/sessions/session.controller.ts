import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Session } from '../../models/entities';
import { SessionQueryInterceptor } from './hooks';
import { SessionService } from './session.service';

const props: IControllerProps<Session> = {
  dto: Session,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  paginate: { hooks: [SessionQueryInterceptor] },
  detail: { hooks: [SessionQueryInterceptor] },
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('sessions')
export class SessionController extends BaseController<Session, string>(props) {
  constructor(protected sessionService: SessionService) {
    super(sessionService);
  }
}
