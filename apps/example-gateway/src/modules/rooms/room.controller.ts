import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Room } from './models';
import { RoomService } from './room.service';

const props: IControllerProps<Room> = {
  dto: Room,
  bearer: AuthGuard,
  guards: RoleGuard,
};

@Controller('rooms')
export class RoomController extends BaseController<Room, string>(props) {
  constructor(protected roomService: RoomService) {
    super(roomService);
  }
}
