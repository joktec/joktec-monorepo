import { BaseService, Injectable, JwtPayload } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { chain } from 'lodash';
import { SuccessResponse } from '../../common';
import { ArticleType } from '../../models/constants';
import { Tag } from '../../models/schemas';
import { TagRepo, UserRepo } from '../../repositories';
import { ClearKeywordDto } from './models';
import { LatestKeywordResponseDto } from './models/tag-response.dto';

@Injectable()
export class TagService extends BaseService<Tag, string> {
  constructor(
    protected tagRepo: TagRepo,
    private userRepo: UserRepo,
  ) {
    super(tagRepo);
  }

  async recentlyKeywords(payload: JwtPayload): Promise<LatestKeywordResponseDto> {
    const { keywords = [] } = await this.userRepo.findOne(payload.sub);
    return {
      feed: chain(keywords)
        .filter(keyword => keyword.type === ArticleType.FEED && !keyword.hidden)
        .orderBy('createdAt', 'desc')
        .uniqBy('value')
        .take(10)
        .value(),
      card: chain(keywords)
        .filter(keyword => keyword.type === ArticleType.CARD && !keyword.hidden)
        .orderBy('createdAt', 'desc')
        .uniqBy('value')
        .take(10)
        .value(),
    };
  }

  async clearKeywords(body: ClearKeywordDto, payload: JwtPayload): Promise<SuccessResponse> {
    const user = await this.userRepo.findOne(payload.sub);
    const keywordIds: string[] = toArray(body.keywordIds);
    if (body.hideAll) {
      user.keywords.filter(key => key.type === body.type).map(key => keywordIds.push(key._id));
    }
    for (const keywordId of keywordIds) {
      await this.userRepo.hiddenKeywords(payload.sub, keywordId);
    }
    return { success: true };
  }
}
