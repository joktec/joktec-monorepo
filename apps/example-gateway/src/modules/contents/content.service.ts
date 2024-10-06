import { BaseService, IPaginationResponse, Injectable } from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { Content } from '../../models/schemas';
import { ContentRepo } from '../../repositories';

@Injectable()
export class ContentService extends BaseService<Content, string> {
  constructor(protected contentRepo: ContentRepo) {
    super(contentRepo);
  }

  async paginate(query: IMongoRequest<Content>): Promise<IPaginationResponse<Content>> {
    return super.paginate({
      ...query,
      select: ['_id', 'code', 'title', 'subhead', 'description', 'type', 'image'],
      sort: { seq: 'asc' },
    });
  }
}
