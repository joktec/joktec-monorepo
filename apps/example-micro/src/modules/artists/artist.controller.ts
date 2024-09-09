import { ClientController, Controller, IMicroControllerProps, Transport } from '@joktec/core';
import { Artist } from '../../models/schemas';
import { ArtistService } from './artist.service';

const props: IMicroControllerProps<Artist> = {
  dto: Artist,
  transport: Transport.REDIS,
};

@Controller('artists')
export class ArtistController extends ClientController<Artist, string>(props) {
  constructor(protected artistService: ArtistService) {
    super(artistService);
  }
}
