import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Artist } from '../../models/schemas';
import { ArtistService } from './artist.service';

const props: IControllerProps<Artist> = {
  dto: Artist,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('artists')
export class ArtistController extends BaseController<Artist, string>(props) {
  constructor(protected artistService: ArtistService) {
    super(artistService);
  }
}
