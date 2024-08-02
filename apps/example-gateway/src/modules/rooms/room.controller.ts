import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Room } from '../../models/entities';
import { RoomService } from './room.service';

const props: IControllerProps<Room> = {
  dto: Room,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('rooms')
export class RoomController extends BaseController<Room, string>(props) {
  constructor(protected roomService: RoomService) {
    super(roomService);
  }
}
