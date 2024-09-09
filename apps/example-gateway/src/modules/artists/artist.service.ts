import { BaseService, IListResponseDto, Inject, Injectable, REQUEST } from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { IRequest } from '../../app.constant';
import { Artist } from '../../models/schemas';
import { ArtistRepo, UserRepo } from '../../repositories';

@Injectable()
export class ArtistService extends BaseService<Artist, string> {
  constructor(
    protected artistRepo: ArtistRepo,
    protected userRepo: UserRepo,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(artistRepo);
  }

  async paginate(query: IMongoRequest<Artist>): Promise<IListResponseDto<Artist>> {
    const loggedUser = this.request.loggedUser;
    const user = await this.userRepo.findById(loggedUser._id);
    const artistIds = user.artistIds.map(String);
    const { items, total } = await this.artistRepo.paginateSelected(query, artistIds);
    return this.transformPaginate(items, total, query.page, query.limit);
  }
}
