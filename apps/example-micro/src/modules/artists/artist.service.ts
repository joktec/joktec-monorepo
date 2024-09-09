import { BaseService, Injectable } from '@joktec/core';
import { Artist } from '../../models/schemas';
import { ArtistRepo } from '../../repositories';

@Injectable()
export class ArtistService extends BaseService<Artist, string> {
  constructor(protected artistRepo: ArtistRepo) {
    super(artistRepo);
  }
}
