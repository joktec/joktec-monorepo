import { BaseController, Controller, ControllerExclude, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { SessionQueryInterceptor } from './hooks';
import { Session } from './models';
import { SessionService } from './session.service';

const props: IControllerProps<Session> = {
  dto: Session,
  excludes: [ControllerExclude.WRITE],
  bearer: AuthGuard,
  guards: RoleGuard,
  hooks: {
    findAll: [SessionQueryInterceptor],
    findOne: [SessionQueryInterceptor],
  },
};

@Controller('sessions')
export class SessionController extends BaseController<Session, string>(props) {
  constructor(protected sessionService: SessionService) {
    super(sessionService);
  }
}
