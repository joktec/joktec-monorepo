import { BaseController, Controller, IBaseControllerProps, RequestMethod } from '@joktec/core';
import { RouteInfo } from '@nestjs/common/interfaces/middleware/middleware-configuration.interface';
import { AdminInterceptor } from '../../base';
import { RoomInterceptor } from './hooks';
import { Room } from './models';
import { RoomService } from './room.service';

const props: IBaseControllerProps<Room> = {
  dto: Room,
  hooks: {
    findAll: [RoomInterceptor],
    create: [AdminInterceptor, RoomInterceptor],
    update: [AdminInterceptor, RoomInterceptor],
    delete: [AdminInterceptor, RoomInterceptor],
  },
};

@Controller('rooms')
export class RoomController extends BaseController<Room, string>(props) {
  constructor(protected roomService: RoomService) {
    super(roomService);
  }

  static excludeRoute(): RouteInfo {
    return { path: 'rooms', method: RequestMethod.GET };
  }
}
