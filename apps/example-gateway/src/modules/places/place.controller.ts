import { BaseController, Controller, IControllerProps, Post } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { PlaceSchema } from '../../models/schemas';
import { PlaceDto, PlaceQuery } from './models';
import { PlaceService } from './place.service';

const props: IControllerProps<PlaceSchema> = {
  dto: PlaceSchema,
  dtoName: PlaceSchema.dtoName,
  customDto: { queryDto: PlaceQuery, createDto: PlaceDto },
  // guards: [AuthGuard, RoleGuard],
  useBearer: true,
  paginate: { search: true },
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('places')
export class PlaceController extends BaseController<PlaceSchema, string>(props) {
  constructor(protected placeService: PlaceService) {
    super(placeService);
  }

  @Post('/migrate')
  async migrateReview() {
    // await this.placeService.migrateOffset(); // migrateOffset: 7.355s
    // await this.placeService.migrateCursor(); // migrateCursor: 3.185s
  }
}
